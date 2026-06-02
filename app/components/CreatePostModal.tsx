"use client";

import { useState } from "react";
import { FaTimes, FaCamera, FaGlassMartini, FaTrash } from "react-icons/fa";
import { useDrinkedInStore, Recipe } from "../store/drinkedinStore";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const addPost = useDrinkedInStore((state) => state.addPost);

  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [showRecipeForm, setShowRecipeForm] = useState(false);

  // Recipe Fields
  const [recipeName, setRecipeName] = useState("");
  const [glass, setGlass] = useState("");
  const [garnish, setGarnish] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !recipeName.trim()) return;

    let recipe: Recipe | undefined = undefined;
    if (showRecipeForm && recipeName.trim()) {
      recipe = {
        name: recipeName.trim(),
        glass: glass.trim() || undefined,
        garnish: garnish.trim() || undefined,
        ingredients: ingredientsText
          .split("\n")
          .map((i) => i.trim())
          .filter((i) => i !== ""),
        instructions: instructionsText
          .split("\n")
          .map((i) => i.trim())
          .filter((i) => i !== ""),
      };
    }

    addPost(content, image.trim() || undefined, recipe);
    
    // Reset state
    setContent("");
    setImage("");
    setRecipeName("");
    setGlass("");
    setGarnish("");
    setIngredientsText("");
    setInstructionsText("");
    setShowRecipeForm(false);
    setShowImageInput(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl z-10 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 px-4 py-3.5">
          <h2 className="text-base font-bold text-zinc-100">Start a Rumor</h2>
          <button 
            onClick={onClose} 
            className="rounded-full p-1 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Post Textarea */}
          <textarea
            placeholder="Share a regret, a missing item, or an unhinged text..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full resize-none bg-transparent text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none"
            required={!showRecipeForm}
          />

          {/* Image Input field */}
          {showImageInput && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-tight">Image URL</label>
                <button
                  type="button"
                  onClick={() => {
                    setImage("");
                    setShowImageInput(false);
                  }}
                  className="text-zinc-500 hover:text-red-400 p-1"
                >
                  <FaTrash className="h-3 w-3" />
                </button>
              </div>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-200 focus:border-amber-500/40 focus:outline-none"
              />
            </div>
          )}

          {/* Cocktail Recipe Creator Form */}
          {showRecipeForm && (
            <div className="rounded-xl border border-amber-500/10 bg-amber-500/[0.02] p-4 space-y-3.5 border-l-2 border-l-amber-500">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FaGlassMartini /> Add Craft Recipe
                </h3>
                <button
                  type="button"
                  onClick={() => setShowRecipeForm(false)}
                  className="text-zinc-500 hover:text-red-400 text-xs flex items-center gap-1"
                >
                  Remove Recipe
                </button>
              </div>

              {/* Recipe Name & Glass */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-tight">Recipe Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Smoky Mezcal Negroni"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-200 focus:border-amber-500/40 focus:outline-none"
                    required={showRecipeForm}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-tight">Glassware</label>
                  <input
                    type="text"
                    placeholder="e.g. Coupe or Rocks Glass"
                    value={glass}
                    onChange={(e) => setGlass(e.target.value)}
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-200 focus:border-amber-500/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* Garnish */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-tight">Garnish</label>
                <input
                  type="text"
                  placeholder="e.g. Charred orange peel, rosemary sprig"
                  value={garnish}
                  onChange={(e) => setGarnish(e.target.value)}
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-200 focus:border-amber-500/40 focus:outline-none"
                />
              </div>

              {/* Ingredients List Textarea */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-tight">Ingredients (one per line) *</label>
                <textarea
                  placeholder="e.g.&#10;30ml Mezcal&#10;30ml Campari&#10;30ml Sweet Vermouth"
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-200 focus:border-amber-500/40 focus:outline-none resize-none"
                  required={showRecipeForm}
                />
              </div>

              {/* Instructions List Textarea */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-tight">Steps (one per line) *</label>
                <textarea
                  placeholder="e.g.&#10;Combine all ingredients in a mixing glass with ice.&#10;Stir until well-chilled.&#10;Strain over a large ice cube into a rocks glass.&#10;Express orange peel oil over the glass."
                  value={instructionsText}
                  onChange={(e) => setInstructionsText(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-200 focus:border-amber-500/40 focus:outline-none resize-none"
                  required={showRecipeForm}
                />
              </div>
            </div>
          )}

          {/* Toolbar & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-900 pt-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowImageInput(!showImageInput)}
                className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-all ${
                  showImageInput
                    ? "bg-zinc-800 text-amber-500"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <FaCamera /> <span>Image</span>
              </button>
              
              <button
                type="button"
                onClick={() => setShowRecipeForm(!showRecipeForm)}
                className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-all ${
                  showRecipeForm
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <FaGlassMartini /> <span>Add Recipe</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={!content.trim() && (!showRecipeForm || !recipeName.trim())}
              className="rounded-full bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:hover:bg-amber-500 px-5 py-1.5 text-xs font-bold text-zinc-950 transition-all hover:scale-[1.02]"
            >
              Post to DrinkedIn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
