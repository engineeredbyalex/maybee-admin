import { useState } from "react";

export default function ProductImages({ images }) {
    const [activeImage, setActiveImage] = useState(images?.[0]);

    return (
        <>
            <div className="text-center">
                <img className="max-w-full max-h-full" src={activeImage} alt="" />
            </div>
            <div className="flex gap-10 mt-2">
                {images.map((image) => (
                    <div
                        key={image}
                        className={`border-2 ${image === activeImage ? "border-gray-300" : "border-transparent"
                            } h-12 p-2 cursor-pointer rounded-md`}
                        onClick={() => setActiveImage(image)}
                    >
                        <img className="max-w-full max-h-full" src={image} alt="" />
                    </div>
                ))}
            </div>
        </>
    );
}
