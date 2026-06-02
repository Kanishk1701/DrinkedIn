"use client";

import { useState } from "react";
import { FaBookmark, FaRegBookmark, FaGlassMartini, FaLemon, FaCheck } from "react-icons/fa";
import { Recipe } from "../store/drinkedinStore";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [saved, setSaved] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-b from-amber-500/[0.04] to-zinc-950 p-4 shadow-inner">
      {/* Recipe Header */}
      <div className="flex items-start justify-between pb-3 border-b border-zinc-800/60">
        <div>
          <span className="inline-block rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-500">
            Industry Recipe
          </span>
          <h3 className="mt-1 text-base font-bold text-zinc-100">{recipe.name}</h3>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
            saved 
              ? "bg-amber-500 text-zinc-950" 
              : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
          }`}
          title={saved ? "Saved to Cellar" : "Save Recipe"}
        >
          {saved ? <FaBookmark className="h-3.5 w-3.5" /> : <FaRegBookmark className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Glassware & Garnish Quick Stats */}
      <div className="grid grid-cols-2 gap-2 my-3 text-xs">
        {recipe.glass && (
          <div className="flex items-center gap-2 rounded-lg bg-zinc-900/60 px-3 py-2 border border-zinc-800/30">
            <FaGlassMartini className="h-3.5 w-3.5 text-amber-500/80" />
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tight">Glassware</p>
              <p className="font-medium text-zinc-300">{recipe.glass}</p>
            </div>
          </div>
        )}
        {recipe.garnish && (
          <div className="flex items-center gap-2 rounded-lg bg-zinc-900/60 px-3 py-2 border border-zinc-800/30">
            <FaLemon className="h-3.5 w-3.5 text-amber-500/80" />
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tight">Garnish</p>
              <p className="font-medium text-zinc-300">{recipe.garnish}</p>
            </div>
          </div>
        )}
      </div>

      {/* Ingredients & Instructions Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-3 pt-1">
        {/* Ingredients List */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Ingredients</h4>
          <ul className="space-y-1.5">
            {recipe.ingredients.map((ing, idx) => {
              const isChecked = !!checkedIngredients[idx];
              return (
                <li 
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  className="flex items-start gap-2 cursor-pointer group text-xs text-zinc-300 hover:text-zinc-100 select-none py-0.5"
                >
                  <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                    isChecked 
                      ? "border-amber-500 bg-amber-500 text-zinc-950" 
                      : "border-zinc-700 bg-zinc-900 group-hover:border-zinc-500"
                  }`}>
                    {isChecked && <FaCheck className="h-2 w-2" />}
                  </div>
                  <span className={`transition-all duration-200 ${isChecked ? "line-through text-zinc-500" : ""}`}>
                    {ing}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Instructions List */}
        <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-zinc-800/60 md:pt-0 md:pl-4 pt-4">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Preparation Steps</h4>
          <ol className="space-y-3">
            {recipe.instructions.map((step, idx) => (
              <li key={idx} className="flex gap-2 text-xs text-zinc-300">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 font-mono text-[10px] font-bold text-amber-500 border border-amber-500/20">
                  {idx + 1}
                </span>
                <p className="leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
