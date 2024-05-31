import Link from "next/link";

const imageUrls = [
  "https://utfs.io/f/90ba1135-a67e-4dd6-9615-71bb5634ec07-hzt98r.jpeg",
];

const images = imageUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main>
      <h1 className="text-center text-3xl font-bold text-stone-700">
        inchallah your kids will be ok
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {images.map((image) => (
          <div key={image.id} className="w-1/3 p-4">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
