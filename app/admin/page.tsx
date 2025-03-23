'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FileObject, ContactSubmission, supabase } from '@/lib/supabase';
import { Upload, MessageSquare, Trash2, Eye, LogOut, Loader2 } from 'lucide-react';
import { toast } from "sonner";

interface UploadProgress {
  loaded: number;
  total: number;
}

// Allowed file types
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/csv',
  'image/jpeg',
  'image/png',
  'image/gif'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('files');
  const [files, setFiles] = useState<FileObject[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileObject | null>(null);

  const handleLogout = () => {
    // Remove the session cookie
    Cookies.remove('adminSessionId');
    // Redirect to login page
    router.push('/admin/login');
  };

  // Fetch data from Supabase
  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Fetch files
      const { data: filesData, error: filesError } = await supabase
        .storage
        .from('website-file-storage')
        .list();

      if (filesError) {
        toast.error(`Failed to fetch files: ${filesError.message}`);
        throw filesError;
      }

      if (filesData) {
        const formattedFiles = await Promise.all(filesData.map(async (file) => {
          const { data: { publicUrl } } = supabase
            .storage
            .from('website-file-storage')
            .getPublicUrl(file.name);

          return {
            id: file.id,
            name: file.name,
            size: file.metadata?.size || 0,
            type: file.metadata?.mimetype || 'unknown',
            created_at: file.created_at,
            url: publicUrl
          };
        }));
        setFiles(formattedFiles);
      }

      // Fetch contact submissions
      const { data: contactsData, error: contactsError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) {
        toast.error(`Failed to fetch contacts: ${contactsError.message}`);
        throw contactsError;
      }

      if (contactsData) {
        setContacts(contactsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data. Please try refreshing the page.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // File upload handling
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    for (const file of acceptedFiles) {
      try {
        // Validate file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          toast.error(`File type not allowed: ${file.type}`);
          continue;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`File too large: ${file.name}. Maximum size is 5MB`);
          continue;
        }

        // Create a safe filename
        const timestamp = Date.now();
        const safeFileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        // Show upload starting toast with a unique ID
        const toastId = toast.loading(`Uploading ${file.name}...`);

        const { data, error } = await supabase.storage
          .from('website-file-storage')
          .upload(safeFileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        // Dismiss the loading toast
        toast.dismiss(toastId);

        if (error) {
          toast.error(`Failed to upload ${file.name}: ${error.message}`);
          throw error;
        }
        
        // Update progress manually since onUploadProgress is not supported
        setUploadProgress(100);
        toast.success(`Successfully uploaded ${file.name}`);
        
        // Refresh file list after upload
        await fetchData();
      } catch (error: any) {
        console.error('Error uploading file:', error);
        toast.error(`Upload failed: ${error.message || 'Unknown error'}`);
      }
    }

    setIsUploading(false);
    setUploadProgress(0);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/csv': ['.csv'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif']
    },
    maxSize: MAX_FILE_SIZE
  });

  // Delete file
  const handleDeleteFile = async (fileName: string) => {
    try {
      // Show delete loading toast
      const toastId = toast.loading(`Deleting ${fileName}...`);

      const { error } = await supabase.storage
        .from('website-file-storage')
        .remove([fileName]);
      
      // Dismiss the loading toast
      toast.dismiss(toastId);
      
      if (error) {
        toast.error(`Failed to delete ${fileName}: ${error.message}`);
        throw error;
      }
      
      toast.success(`Successfully deleted ${fileName}`);
      // Refresh file list
      await fetchData();
    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast.error(`Delete failed: ${error.message || 'Unknown error'}`);
    }
  };

  // Update contact status
  const handleUpdateContactStatus = async (id: string, status: 'new' | 'in_progress' | 'completed') => {
    try {
      // Show update loading toast
      const toastId = toast.loading('Updating status...');

      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);
      
      // Dismiss the loading toast
      toast.dismiss(toastId);
      
      if (error) {
        toast.error(`Failed to update status: ${error.message}`);
        throw error;
      }
      
      toast.success('Status updated successfully');
      // Refresh contacts
      await fetchData();
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error(`Update failed: ${error.message || 'Unknown error'}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-['Poppins'] text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="files" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>File Management</CardTitle>
                <CardDescription>
                  Upload and manage files (Max size: 5MB)
                  <br />
                  Allowed types: PDF, Excel, Word, CSV, Images (JPG, PNG, GIF)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'
                  }`}
                >
                  <input {...getInputProps()} />
                  {isUploading ? (
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-400" />
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {isDragActive 
                      ? 'Drop the files here' 
                      : isUploading 
                        ? 'Uploading...' 
                        : 'Drag & drop files here, or click to select files'
                    }
                  </p>
                </div>

                {isUploading && (
                  <div className="mt-4 space-y-2">
                    <Progress value={uploadProgress} />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Uploading... {Math.round(uploadProgress)}%
                    </p>
                  </div>
                )}

                <Separator className="my-6" />

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {files.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                          No files uploaded yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      files.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell>{file.name}</TableCell>
                          <TableCell>{file.type}</TableCell>
                          <TableCell>{Math.round(file.size / 1024)} KB</TableCell>
                          <TableCell>{format(new Date(file.created_at), 'PP')}</TableCell>
                          <TableCell className="space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => window.open(file.url, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeleteFile(file.name)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>Manage and respond to contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                          No contact submissions yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      contacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell>{contact.name}</TableCell>
                          <TableCell>{contact.contact}</TableCell>
                          <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                          <TableCell>
                            <select
                              value={contact.status}
                              onChange={(e) => handleUpdateContactStatus(contact.id, e.target.value as any)}
                              className="p-1 rounded border dark:bg-gray-800 dark:border-gray-700"
                            >
                              <option value="new">New</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </TableCell>
                          <TableCell>{format(new Date(contact.created_at), 'PP')}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Contact Submission Details</DialogTitle>
                                  <DialogDescription>
                                    Submitted on {format(new Date(contact.created_at), 'PPpp')}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium">Name</h4>
                                    <p>{contact.name}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Contact</h4>
                                    <p>{contact.contact}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Message</h4>
                                    <p className="whitespace-pre-wrap">{contact.message}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
} 