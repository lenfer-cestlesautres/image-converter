import Cropperjs from "cropperjs";
import { useEffect, useMemo, useRef } from "react";
import "cropperjs/dist/cropper.css";

export default function Cropper({ file, onCrop }) {
  const src = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => () => URL.revokeObjectURL(src), [src]);

  const imageRef = useRef();
  const cropperRef = useRef();

  useEffect(() => {
    const report = () => {
      cropper.getCroppedCanvas().toBlob((blob) => {
        onCrop(blob)
      }, "image/png", 1)
    };

    const cropper = new Cropperjs(imageRef.current, {
      viewMode: 1,
      ready: report,
      cropend: report
    });

    cropperRef.current = cropper;

    return () => {
      cropper.destroy();
    };
  }, [onCrop]);

  useEffect(() => {
    cropperRef.current.replace(src);
  }, [src]);

  return (
    <div style={{ width: 480, height: 480 }}>
      <img src={src} ref={imageRef} />
    </div>
  );
}
