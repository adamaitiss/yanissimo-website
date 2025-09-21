import { LightboxGallery, type LightboxImage } from "@/components/lightbox-gallery";

export type RoomGalleryImage = LightboxImage;

export type RoomGalleryProps = {
  roomTitle: string;
  images: RoomGalleryImage[];
};

export const RoomGallery = ({ images, roomTitle }: RoomGalleryProps) => {
  return (
    <LightboxGallery
      images={images}
      groupLabel={`номер ${roomTitle}`}
      gridClassName="grid gap-4 sm:grid-cols-2"
      priorityFirst
    />
  );
};
