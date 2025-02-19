"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Router, X } from "lucide-react";
import {
  AddNewVideoType,
  TableFilterVideoType,
  TopicType,
} from "@/utils/admin/type";
import { useState, useEffect } from "react";
import { fetchAllFilterCategory } from "@/utils/video/category";
import { fetchVideoCategoryData } from "@/utils/video/workoutVideoCollection";
import { toast } from "sonner";
import { fetchPostVideo } from "@/utils/admin/fetch";
import { useAuthStore } from "@/components/providers/auth-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AddVideo = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const router = useRouter();
  const [video, setVideo] = useState<AddNewVideoType>({
    name: "",
    url: "",
    isFeatured: false,
    videoTopics: [],
    videoCategories: [],
  });

  const [topics, setTopics] = useState<TopicType[]>([]);
  const [videoCategories, setVideoCategories] = useState<
    TableFilterVideoType[]
  >([]);
  const [errors, setErrors] = useState({
    name: "",
    url: "",
    isFeatured: "",
    videoTopics: "",
    videoCategories: "",
  });
  const [isVideoValid, setIsVideoValid] = useState(false);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const data = await fetchVideoCategoryData();
        setTopics(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTopics();
  }, []);

  useEffect(() => {
    const getVideoCategories = async () => {
      try {
        const response = await fetchAllFilterCategory();
        const sortedResponse = response
          .sort((a: TableFilterVideoType, b: TableFilterVideoType) =>
            a.type.localeCompare(b.type)
          )
          .map((category: TableFilterVideoType) => ({
            ...category,
            videoCategories: category.videoCategories.sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
          }));
        setVideoCategories(sortedResponse);
      } catch (error) {
        console.error(error);
      }
    };
    getVideoCategories();
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setVideo((prevVideo) => ({
      ...prevVideo,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange("isFeatured", e.target.checked);
  };

  const handleTopicChange = (value: string) => {
    const selectedTopic = topics.find((topic) => topic.name === value);
    if (
      selectedTopic &&
      !video.videoTopics.some((topic) => topic.id === selectedTopic.id)
    ) {
      setVideo((prevVideo) => ({
        ...prevVideo,
        videoTopics: [...prevVideo.videoTopics, selectedTopic],
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        videoTopics: "",
      }));
    }
  };

  const handleRemoveTopic = (index: number) => {
    const updatedTopics = [...video.videoTopics];
    updatedTopics.splice(index, 1);
    setVideo((prevVideo) => ({
      ...prevVideo,
      videoTopics: updatedTopics,
    }));
  };

  const handleCategoryChange = (type: string, value: string) => {
    const selectedCategory = videoCategories
      .find((category) => category.type === type)
      ?.videoCategories.find((category) => category.name === value);
    if (selectedCategory) {
      const updatedVideoCategories = video.videoCategories.filter(
        (category) => category.type !== type
      );
      setVideo((prevVideo) => ({
        ...prevVideo,
        videoCategories: [...updatedVideoCategories, selectedCategory],
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        videoCategories: "",
      }));
    }
  };

  const handleRemoveCategory = (type: string) => {
    const updatedVideoCategories = video.videoCategories.filter(
      (category) => category.type !== type
    );
    setVideo((prevVideo) => ({
      ...prevVideo,
      videoCategories: updatedVideoCategories,
    }));
  };

  const checkVideoExists = async (videoId: string) => {
    const apiKey = "AIzaSyC7RV-Yf4DiF8L4Xj4DprWjceASn5r-S6s";
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=id&id=${videoId}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.items.length > 0) {
        setIsVideoValid(true);
        toast.success("Video Exists", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      } else {
        setIsVideoValid(false);
        toast.error("Video does not exists", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    } catch (error) {
      setIsVideoValid(false);
      toast.error("Error when checking video", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checkEmptyFields = () => {
      let hasError = false;

      if (!video.name) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "Please fill in the video name.",
        }));
        hasError = true;
      }

      if (!video.url) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          url: "Please fill in the video URL.",
        }));
        hasError = true;
      }

      if (video.videoTopics.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          videoTopics: "Please select at least one topic.",
        }));
        hasError = true;
      }

      if (video.videoCategories.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          videoCategories: "Please select at least one category.",
        }));
        hasError = true;
      }

      return hasError;
    };

    if (checkEmptyFields()) {
      return;
    }

    if (!isVideoValid) {
      toast.error("Please check the video ID before submitting");
      return;
    }

    try {
      const response = await fetchPostVideo(video, sessionToken!);
      toast.success(response, {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
      router.push("/admin/workout-videos-management");
    } catch (error) {
      toast.error("Error When Adding Video", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };

  return (
    <div className="container mx-auto py-12">
      <header className="flex items-center rounded-lg h-16 px-4 border-b shrink-0 md:px-6 bg-slate-700 text-white fixed top-[60px] left-1/2 transform -translate-x-1/2 w-full max-w-screen-2xl z-50">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            prefetch={false}
          >
            <span>Add Video</span>
          </Link>
        </nav>
        <div className="ml-auto">
          <Link href="/admin" className="text-lg font-semibold">
            Home
          </Link>
        </div>
      </header>
      <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Video Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter video name"
            value={video.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="url" className="block font-medium mb-2">
            Video ID
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              id="url"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter video ID"
              value={video.url}
              onChange={(e) => handleInputChange("url", e.target.value)}
            />
            <Button
              type="button"
              variant="primary"
              className="text-lg"
              onClick={() => checkVideoExists(video.url)}
            >
              Check
            </Button>
          </div>
          {errors.url && <p className="text-red-500">{errors.url}</p>}
        </div>
        <div>
          <label htmlFor="is-featured" className="block font-medium mb-2">
            Featured
          </label>
          <input
            type="checkbox"
            id="is-featured"
            className="mr-2"
            checked={video.isFeatured}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="is-featured">Is this video featured?</label>
        </div>
        <div>
          <label htmlFor="video-topics" className="block font-medium mb-2">
            Video Topics
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Select onValueChange={handleTopicChange}>
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <SelectValue placeholder="Select Video Topics" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic.id} value={topic.name}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {video.videoTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-md p-4 flex items-center"
              >
                <span className="font-medium">{topic.name}</span>
                <Button
                  variant="default"
                  size="icon"
                  className="ml-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveTopic(index);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          {errors.videoTopics && (
            <p className="text-red-500">{errors.videoTopics}</p>
          )}
        </div>
        <div>
          <label htmlFor="video-categories" className="block font-medium mb-2">
            Video Categories
          </label>
          <div className="grid grid-cols-2 gap-4">
            {videoCategories.map((category) => (
              <div
                key={category.type}
                className="flex flex-col items-start space-y-2"
              >
                <label className="block text-lg font-medium">
                  {category.type}
                </label>
                <Select
                  onValueChange={(value) =>
                    handleCategoryChange(category.type, value)
                  }
                >
                  <SelectTrigger className="w-64 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg">
                    <SelectValue
                      placeholder={`Select ${category.type} Category`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {category.videoCategories.map((subCategory) => (
                      <SelectItem key={subCategory.id} value={subCategory.name}>
                        {subCategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-4 mt-4">
                  {video.videoCategories
                    .filter((cat) => cat.type === category.type)
                    .map((filteredCategory, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 rounded-md p-4 flex items-center space-x-2"
                      >
                        <span className="font-medium">
                          {filteredCategory.name}
                        </span>
                        <Button
                          variant="default"
                          size="icon"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveCategory(filteredCategory.type);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          {errors.videoCategories && (
            <p className="text-red-500">{errors.videoCategories}</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="text-lg">
            Add Video
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddVideo;
