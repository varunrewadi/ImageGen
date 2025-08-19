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
          "http://localhost:8080/api/v1/imagen/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();

        setForm({ ...form, photo: data.image });
      } catch (err) {
        alert("Error generating image: " + err.message);
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
        const response = await fetch("http://localhost:8080/api/v1/imagen", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert("Error sharing post: " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  return (
    <section className="min-h-screen max-w-7xl mx-auto bg-[#18181b] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto">
        <div>
          <h1 className="font-extrabold text-white text-[32px]">Create</h1>
          <p className="mt-2 text-[#a1a1aa] text-[14px] max-w-[500px]">
            Generate an imaginative image through DALL-E AI and share it with
            the community
          </p>
        </div>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            {/* Add spacing above the first input field */}
            <div className="mt-6">
              <FormField
                labelName="Your Name"
                type="text"
                name="name"
                placeholder="Ex., john doe"
                value={form.name}
                handleChange={handleChange}
              />
            </div>

            {/* Prompt field with Surprise Me button aligned right */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-white">
                  Prompt
                </label>
                <button
                  type="button"
                  onClick={handleSurpriseMe}
                  className="text-xs bg-[#23232a] text-[#a1a1aa] px-3 py-1 rounded-md border border-[#27272a] hover:bg-[#27272a] transition-colors duration-200"
                >
                  Surprise Me
                </button>
              </div>
              <FormField
                labelName=""
                type="text"
                name="prompt"
                placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                value={form.prompt}
                handleChange={handleChange}
              />
            </div>

            <div className="relative bg-[#23232a] border border-[#27272a] text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
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
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.7)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-colors duration-200"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>

          <div className="mt-10">
            <p className="mt-2 text-[#a1a1aa] text-[14px]">
              ** Once you have created the image you want, you can share it with
              others in the community **
            </p>
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] hover:bg-[#4b50c8] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-colors duration-200"
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
