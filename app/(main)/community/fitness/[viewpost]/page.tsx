"use client";
import React from "react";
import defaultProfile from "/public/default-iProfile.png";
import Image from "next/image";
import fitness_icon from "/public/fitness-icon.svg";
import message_icon from "/public/message-icon.svg";
import saved_icon from "/public/saved-posts-icon.svg";
import share_icon from "/public/share-icon.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import before_after from "/public/before-after-icon.svg";
import challenges_icon from "/public/challenges-icon.svg";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import back_Icon from "/public/back-icon.svg";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Comment from "../../comment";
const FitnessPost = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/");
    const title = pathParts[2];
    return (
        <div className="w-[823px] mt-3">
            <Link
                href={`/community/${title}`}
                className="flex gap-2 items-center justify-start mb-4"
            >
                <Image src={back_Icon} width={24} height={24} alt="back" />
                <span className="text-[15px] text-black flex gap-2 ">
                    Back to <span>#{title}</span>
                </span>
            </Link>

            <div className="w-full flex flex-col p-2 gap-2 hover:bg-[#f5f5f5] rounded-lg">
                <div className="w-full flex justify-between items-center ">
                    <div className="flex gap-2 items-center ">
                        <Sheet>
                            <SheetTrigger>
                                <Image
                                    src={defaultProfile}
                                    alt="logo"
                                    width={32}
                                    height={32}
                                    className="cursor-pointer"
                                />
                            </SheetTrigger>
                            <SheetContent className="w-[350px]">
                                <SheetHeader>
                                    <SheetTitle className="text-sm font-medium border-b border-gray-200 pb-4">
                                        User Profile
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col">
                                    <Image
                                        src={defaultProfile}
                                        alt="logo"
                                        width={50}
                                        height={50}
                                        className="cursor-pointer py-2"
                                    />
                                    <label
                                        className="text-[16px] font-semibold mt-2"
                                        htmlFor=""
                                    >
                                        Destiny
                                    </label>
                                    <div className="flex flex-col gap-2 mt-1">
                                        <span className="text-sm">
                                            @destinyguillory2000
                                        </span>

                                        <div className="flex gap-1">
                                            <Image
                                                src={before_after}
                                                width={18}
                                                height={18}
                                                alt="logo"
                                            />
                                            <label
                                                htmlFor=""
                                                className="text-sm"
                                            >
                                                0 Challenges Completed
                                            </label>
                                        </div>
                                        <div className="flex gap-1">
                                            <Image
                                                src={challenges_icon}
                                                width={18}
                                                height={18}
                                                alt="logo"
                                            />
                                            <label
                                                htmlFor=""
                                                className="text-sm"
                                            >
                                                120 Achievement Points
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <Button variant="primary">
                                            View Profile
                                        </Button>
                                        <Button
                                            variant="default"
                                            className="bg-[#EFF0F4]"
                                        >
                                            Send Message
                                        </Button>
                                    </div>
                                    <div className="mt-7 flex gap-5 justify-center items-center">
                                        <div className="flex items-center gap-1 flex-col w-[40%]">
                                            <label
                                                htmlFor=""
                                                className="text-[#868A93] text-sm "
                                            >
                                                Comments
                                            </label>
                                            <span className="text-[18px]">
                                                752
                                            </span>
                                        </div>
                                        <hr className="bg-[#CDD5DE] mx-2 min-h-7 w-[1px] shrink-0 flex" />
                                        <div className="flex items-center gap-1 flex-col w-[40%]">
                                            <label
                                                htmlFor=""
                                                className="text-[#868A93] text-sm"
                                            >
                                                Posts
                                            </label>
                                            <span className="text-[18px]">
                                                752
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <label
                            className="text-[#303033] text-sm font-bold cursor-pointer"
                            htmlFor=""
                        >
                            stellaria
                        </label>
                        <span className="text-sm">5 days ago</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-1 rounded-full bg-[#EFF0F4] w-[81.64px] p-2 justify-center items-center">
                            <Image
                                src={fitness_icon}
                                alt="logo"
                                width={13}
                                height={12}
                            />
                            <span className="text-[12px]">Workout</span>
                        </div>
                        <div className="flex gap-1 rounded-full bg-[#EFF0F4] w-[81.64px] p-2 justify-center items-center">
                            <Image
                                src={fitness_icon}
                                alt="logo"
                                width={13}
                                height={12}
                            />
                            <span className="text-[12px]">Workout</span>
                        </div>
                    </div>
                </div>
                <Link
                    href="/community/fitness"
                    className="text-black text-lg font-medium mt-3"
                >
                    How Was Your Workout Today? | Weekly Thread
                </Link>
                <div className="text-[#303033] text-[16px] mt-2">
                    Want to share your daily fitness journey with the community
                    and cheer each other on? This is the place to do it! Tell us
                    how your workout went, what program or activity you did, new
                    habits you're working on, and see how others are doing too.
                    Refreshing the workout thread for a new week ahead!
                </div>
                <div className="flex gap-2 items-center mt-6">
                    <Button
                        variant="secondary"
                        className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 justify-center items-center"
                    >
                        <Image
                            src={message_icon}
                            alt="logo"
                            width={20}
                            height={20}
                        />
                        <span className="text-[12px]">
                            <span>33</span> Replies
                        </span>
                    </Button>
                    <Button
                        variant="secondary"
                        className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 justify-center items-center"
                    >
                        <Image
                            src={saved_icon}
                            alt="logo"
                            width={20}
                            height={20}
                        />
                        <span className="text-[12px]">Saved</span>
                    </Button>
                    <Button
                        variant="secondary"
                        className="flex gap-1 rounded-full bg-[#EFF0F4] p-4 justify-center items-center"
                    >
                        <Image
                            src={share_icon}
                            alt="logo"
                            width={20}
                            height={20}
                        />
                        <span className="text-[12px]">Share</span>
                    </Button>
                </div>

                <hr className="mt-3" />
            </div>
            <div className="w-full px-2 flex flex-col gap-1">
                <h1 className="flex items-center p-1 font-bold">
                    Post A Reply
                </h1>
                <Textarea
                    placeholder="Write a response for this post"
                    className="rounded-lg bg-transparent p-3 text-[16px]"
                />
                <div className=" flex items-center justify-end mt-3">
                    <Button variant="primary" className="w-[188px] h-9 flex">
                        Reply
                    </Button>
                </div>
                <hr className="mt-3" />
            </div>

            {/* comment section */}
            <div className="flex items-center mt-10 gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center cursor-pointer ">
                            <span className="text-sm">Latest</span>
                            <ChevronDown className="text-sm w-[18.72px]" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-35 absolute mt-5 "
                        side="left"
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <span>Latest</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Upvotes</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    );
};

export default FitnessPost;
