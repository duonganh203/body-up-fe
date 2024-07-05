import { EditableRecipeType } from "@/app/(main)/admin/recipes-management/recipe-management";
import { AddNewRecipeType, AddNewVideoType } from "./type";
import { VideoType } from "@/app/(main)/admin/workout-video-management/video-management";
import { AddNewProgramType } from "@/app/(main)/admin/create-workout-program/add-workout-program";
import { EditProgramType } from "@/app/(main)/admin/workout-program-management/edit-program/[programId]/edit-workout-program";

export const fetchGetTotalElements = async (sessionToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/dashboard`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fail To Get Total Elements`);
  }
};
export const fetchGetMonthlyUserCount = async (sessionToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/monthly-user-count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fail To Get Monthly User Count`);
  }
};
export const fetchGetMonthlyUserChallengeCompletedCount = async (
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/monthly-user-challenge-completed-count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fail To Get Monthly User Count`);
  }
};
export const fetchGetMonthlyUserChallengeUncompletedCount = async (
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/monthly-user-challenge-uncompleted-count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fail To Get Monthly User Count`);
  }
};
export const fetchGetRecipeTopic = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/topic-recipe/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while fetching data recipe collection`);
  }
};
export const fetchGetTableFilterRecipe = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/recipe-category/table`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get table filter`);
  }
};
export const fetchPostRecipe = async (
  recipe: AddNewRecipeType,
  sessionToken: string
) => {
  const { img, otherImageRecipes, ...rest } = recipe;
  const resultFromServer = await fetch(
    `${process.env.NEXT_PUBLIC_API}/recipe`,
    {
      method: "POST",
      body: JSON.stringify({ img, otherImageRecipes }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = { status: res.status, payload };
    if (!res.ok) {
      throw new Error("Error while upload img to cloudinary");
    }
    return data;
  });
  const updatedOtherImage = otherImageRecipes.map((objImg, index) => {
    objImg.img = resultFromServer.payload.results2[index].secure_url;
    return objImg;
  });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/create-recipe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          ...rest,
          img: resultFromServer.payload.results1.secure_url,
          otherImageRecipes: updatedOtherImage,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error while fetching post recipe`);
  }
};
export const fetchPostVideo = async (
  video: AddNewVideoType,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/create-video`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(video),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error while fetching post recipe`);
  }
};
export const fetchGetRecipes = async (
  pageNo: number,
  pageSize: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/list-recipe?pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get table filter`);
  }
};

export const fetchGetRecipeDetailById = async (
  recipeId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/recipe-detail?recipeId=${recipeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get table filter`);
  }
};
export const fetchPutRecipe = async (
  sessionToken: string,
  updatedRecipe: EditableRecipeType
) => {
  console.log(updatedRecipe);
  const { img, otherImageRecipes, ...rest } = updatedRecipe;
  const resultFromServer = await fetch(
    `${process.env.NEXT_PUBLIC_API}/recipe`,
    {
      method: "POST",
      body: JSON.stringify({ img, otherImageRecipes }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = { status: res.status, payload };
    if (!res.ok) {
      throw new Error("Error while upload img to cloudinary");
    }
    return data;
  });
  const updatedOtherImage = otherImageRecipes.map((objImg, index) => {
    objImg.img = resultFromServer.payload.results2[index].secure_url;
    return objImg;
  });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/update-recipe`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          ...rest,
          img: resultFromServer.payload.results1.secure_url,
          otherImageRecipes: updatedOtherImage,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update the recipe");
    }
    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error while updating the recipe`);
  }
};
export const fetchDeleteRecipe = async (
  recipeId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/delete-recipe?recipeId=${recipeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error while get table filter`);
  }
};
export const fetchGetUser = async (
  pageNo: number,
  pageSize: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/list-user?pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get User`);
  }
};
export const fetchGetVideos = async (
  pageNo: number,
  pageSize: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/list-video?pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get Videos`);
  }
};
export const fetchDeleteVideo = async (
  videoId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/delete-video?videoId=${videoId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error when deleting video`);
  }
};
export const fetchPutVideo = async (
  sessionToken: string,
  updatedVideo: VideoType
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/update-video`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(updatedVideo),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update the video");
    }
    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error while updating the video`);
  }
};
export const fetchGetPosts = async (
  pageNo: number,
  pageSize: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/list-post?pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get Posts`);
  }
};
export const fetchGetPostDetailById = async (
  postId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/post-detail?postId=${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get post details`);
  }
};
export const fetchDeletePost = async (postId: number, sessionToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/delete-post?postId=${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error when deleting post`);
  }
};
export const fetchGetVideoDetailById = async (
  videoId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/video-detail?videoId=${videoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get video details`);
  }
};
export const fetchGetAllVideoSelectForAdmin = async (sessionToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/list-video-select`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get video select`);
  }
};
export const fetchGetAllRecipeSelectForAdmin = async (sessionToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/list-recipe-select`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get recipe select`);
  }
};

export const fetchPostWorkoutProgram = async (
  workoutProgram: AddNewProgramType,
  sessionToken: string
) => {
  const { img, banner, ...rest } = workoutProgram;
  const resultFromServer = await fetch(
    `${process.env.NEXT_PUBLIC_API}/workout-program`,
    {
      method: "POST",
      body: JSON.stringify({ img, banner }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = { status: res.status, payload };
    if (!res.ok) {
      throw new Error("Error while upload img and to cloudinary");
    }
    return data;
  });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/create-program`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          ...rest,
          img: resultFromServer.payload.results1.secure_url,
          banner: resultFromServer.payload.results2.secure_url,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error while fetching post workout program`);
  }
};
export const fetchGetWorkoutPrograms = async (
  pageNo: number,
  pageSize: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/list-workout-program?pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get Workout Program`);
  }
};
export const fetchDeleteWorkoutProgram = async (
  workoutProgramId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/delete-workout-program?workoutProgramId=${workoutProgramId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error when deleting workout program`);
  }
};
export const fetchGetWorkoutProgramDetailById = async (
  workoutProgramId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/workout-program-detail?workoutProgramId=${workoutProgramId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get workout program detail`);
  }
};
export const fetchPutWorkoutProgram = async (
  sessionToken: string,
  updateWorkoutProgram: EditProgramType
) => {
  const { img, banner, ...rest } = updateWorkoutProgram;
  const resultFromServer = await fetch(
    `${process.env.NEXT_PUBLIC_API}/workout-program`,
    {
      method: "POST",
      body: JSON.stringify({ img, banner }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = { status: res.status, payload };
    if (!res.ok) {
      throw new Error("Error while upload img and to cloudinary");
    }
    return data;
  });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/update-workout-program`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          ...rest,
          img: resultFromServer.payload.results1.secure_url,
          banner: resultFromServer.payload.results2.secure_url,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update the video");
    }
    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error while updating the Workout Program`);
  }
};
export const fetchGetTopUserCompletedChallenge = async (
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/top3-completed-challenges`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get Top User Completed Challenge`);
  }
};
