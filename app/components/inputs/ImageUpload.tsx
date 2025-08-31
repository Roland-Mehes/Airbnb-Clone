'use client';

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: CloudinaryUploadWidgetResults) => {
      const info = result?.info as { secure_url?: string }; // biztonságosan castoljuk
      if (info?.secure_url) {
        onChange(info.secure_url);
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{ maxFiles: 1 }}
      onSuccess={(result) => handleUpload(result)}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => {
            if (open) open();
            else console.error('Upload widget failed to initialize.');
          }}
          className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to upload</div>

          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                alt="Upload"
                fill
                style={{ objectFit: 'cover' }}
                src={value}
              />
            </div>
          )}
        </button>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
