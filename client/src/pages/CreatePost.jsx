import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://dalle-arbb.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dalle-arbb.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );

        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="font-extrabold text-[#222328] text-4xl mb-2">Create</h1>
        <p className="text-[#666e75] text-base text-center max-w-xl mb-6">
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl w-full max-w-xs mx-auto p-4 h-64 flex justify-center items-center shadow-sm">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-10 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-xl">
                <Loader />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={generateImage}
            className="w-full text-white bg-green-700 hover:bg-green-800 font-semibold rounded-lg text-base px-5 py-3 transition-colors duration-200"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
          <div className="mt-6 flex flex-col items-center">
            <p className="text-[#666e75] text-sm text-center mb-2">
              <span className="font-semibold">
                Once you have created the image you want, you can share it with
                others in the community
              </span>
            </p>
            <button
              type="submit"
              className="w-full text-white bg-[#6469ff] hover:bg-[#4b50c8] font-semibold rounded-lg text-base px-5 py-3 transition-colors duration-200"
            >
              {loading ? "Sharing..." : "Share with the Community"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
