import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Basic/Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  weight: existingWeight,
  duration: existingDuration,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [category, setCategory] = useState(assignedCategory || '');
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [weight, setWeight] = useState(existingWeight || '');
  const [duration, setDuration] = useState(existingDuration || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCategoriesLoading(true);
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
      setCategoriesLoading(false);
    });
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      weight,
      duration,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (_id) {
      await axios.put('/api/products', { ...data, _id });
    } else {
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push('/products');
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  function deleteImage(index) {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }


  function updateImagesOrder(images) {
    setImages(images);
  }

  function setProductProp(propName, value) {
    setProductProperties(prev => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  return (
    <form onSubmit={saveProduct} className="p-4">
      <label className="block">Nume produs</label>
      <input
        type="text"
        placeholder="Nume Produs"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        className="border p-2 my-2 w-full"
      />
      <label className="block">Categorie</label>
      <select
        value={category}
        onChange={ev => setCategory(ev.target.value)}
        className="border p-2 my-2 w-full"
      >
        <option value="">Fara categorie</option>
        {categories.length > 0 &&
          categories.map(c => (
            <option key={c.name} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {categoriesLoading && <Spinner />}

      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
        >
          {images?.length > 0 &&
            images.map((link, index) => (
              <div key={link} className="h-[200px] w-[200px] bg-white p-4 shadow-sm rounded-sm border border-gray-200 flex flex-col items-center justify-center">
                <img src={link} alt="" className="rounded-lg w-[150px] h-[150px]" />
                <button
                  className="bg-red-500 text-white  px-2 py-1 rounded mt-1"
                  onClick={() => deleteImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="h-[200px] w-[200px] cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div>
            Adauga imagine
          </div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>

      <textarea
        className="min-h-[30vh] border p-2 my-2 w-full"
        placeholder="description"
        value={description}
        onChange={ev => setDescription(ev.target.value)}
      />

      <input
        placeholder="Greutate"
        value={weight}
        onChange={ev => setWeight(ev.target.value)}
        className="border p-2 my-2 w-full"
      />
      <input
        placeholder="Timp de ardere - nu e functional momentan"
        value={duration}
        onChange={ev => setDuration(ev.target.value)}
        className="border p-2 my-2 w-full"
      />
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={ev => setPrice(ev.target.value)}
        className="border p-2 my-2 w-full"
      />

      <button
        type="submit"
        className="bg-[#000] text-white font-bold py-2 px-4 rounded mt-4"
      >
        Salvare
      </button>
    </form>
  );
}
