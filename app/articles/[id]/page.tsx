
import React from "react";
interface Props {
  params: { id: string };
}

const ArticleModal = async ({ params }: Props) => {
  const { id } = await params;
  const article = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return (
    <div>
      <button className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-red-100 text-red-700 rounded-full shadow-md hover:bg-red-200 hover:text-red-900 transition">
        ✕
      </button>

      <h2 className="text-4xl font-extrabold text-red-700 tracking-wide">
        #{article.id}
      </h2>

      <h2 className="text-3xl font-semibold text-green-800 leading-snug">
        {article.title}
      </h2>

      <p className="text-gray-700 text-lg leading-relaxed">{article.body}</p>
    </div>
  );
};

export default ArticleModal;
