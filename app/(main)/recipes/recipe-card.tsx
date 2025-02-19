/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import StarRating from "./star-rating";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import { fetchPostBookmarkRecipe } from "@/utils/recipe/fetch";
import { splitName } from "@/utils/recipe/handle-data";
import { RecipeCardType } from "@/utils/recipe/type";

const RecipeCard = ({ recipe }: { recipe: RecipeCardType }) => {
  const [currentBookmark, setCurrentBookmark] = useState<boolean>(
    recipe.bookmarked
  );
  const { sessionToken } = useAuthStore((store) => store);
  const handleBookmark = async () => {
    try {
      await fetchPostBookmarkRecipe(recipe.id, sessionToken!);
      setCurrentBookmark(!currentBookmark);
      toast.success(
        `${!currentBookmark ? "Book mark success fully" : "Delete Bookmark Successfully"} `,
        {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        }
      );
    } catch (error) {
      toast.error("Please login account", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };
  return (
    <>
      <div
        key={recipe.id}
        className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px]"
      >
        <div className="relative h-full">
          <Link href={`/recipes/${recipe.id}`}>
            <img
              className="h-[87%] w-full rounded-[15px] object-cover"
              src={recipe.img}
              alt="Recipe image"
            />
          </Link>
          <div className="flex flex-col absolute bottom-[calc(13%+12px)] left-3 flex-wrap-reverse">
            {recipe.recipeCategories.map((recipeCategory, index) => (
              <div className="group" key={index}>
                <Button
                  className=" my-1 group-hover:hidden visible"
                  variant="secondary"
                  size="icon"
                >
                  <a href="#">{splitName(recipeCategory.name)}</a>
                </Button>
                <Button
                  className=" my-1 group-hover:flex hidden"
                  variant="secondary"
                  size="default"
                >
                  <Link
                    href={`/recipes/filter-recipe/categoryId${recipeCategory.id}`}
                  >
                    {recipeCategory.name}
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="flex w-full justify-between items-center absolute top-3 px-5">
            <StarRating
              id={recipe.id}
              avgStar={parseFloat(recipe.avgStar.toFixed(2))}
              currentRating={recipe.currentRating}
            />
            <div className="flex">
              <Button variant="secondary" size="icon">
                <Heart
                  className="text-[#000000] cursor-pointer"
                  strokeWidth={1}
                  width={24}
                  height={25}
                  fill={`${currentBookmark === false ? "transparent" : "#FF0000"}`}
                  onClick={() => handleBookmark()}
                />
              </Button>
            </div>
          </div>
          <Link href={`/recipes/${recipe.id}`}>
            <p className="text-[18px]  font-medium leading-[150%] pl-3 h-[13%] text-[#303033] flex items-center ">
              {recipe.name}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
