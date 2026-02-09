'use client';

import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({ value, onChange, maxImages = 1 }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if(file) {
          const reader = new FileReader();
          reader.onload = (event) => {
              const newUrl = event.target?.result as string;
              onChange([...value, newUrl]);
          }
          reader.readAsDataURL(file);
      }
  }

  const onRemove = (url: string) => {
    onChange(value.filter((current) => current !== url));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-40 h-40 rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <button type="button" onClick={() => onRemove(url)} className="p-1 bg-red-600 text-white rounded-full">
                <X className="h-4 w-4" />
              </button>
            </div>
            <img
              className="object-cover w-full h-full"
              alt="Image"
              src={url}
            />
          </div>
        ))}
         {value.length < maxImages && (
            <label className="w-40 h-40 rounded-md overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer">
                <div className="text-center space-y-2">
                    <Plus className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500">Upload an image</p>
                </div>
                <input type="file" className="sr-only" onChange={onFileChange}/>
            </label>
        )}
      </div>
    </div>
  );
}
