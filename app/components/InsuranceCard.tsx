import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface InsuranceCardProps {
  title: string;
  description: string;
  imagePath: string;
  link: string;
  gradient: string;
}

export default function InsuranceCard({ title, description, imagePath, link, gradient }: InsuranceCardProps) {
  return (
    <Link href={link}>
      <div className={`relative overflow-hidden rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 ${gradient}`}>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/90">{description}</p>
        </div>
        <div className="absolute inset-0 bg-black/20 z-0" />
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover -z-10"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    </Link>
  );
} 