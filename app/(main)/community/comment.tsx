"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import Image from "next/image";
import defaultProfile from "/public/default-iProfile.png";
import upvote_icon from "/public/upvote-icon.svg";
import updown_icon from "/public/updown-icon.svg";
import reply_icon from "/public/reply-icon.svg";
const Comment = () => {
    const [isOpennedReply, setIsOpennedReply] = useState(false);
    const [countUpvoted, setCountUpvoted] = useState<number>(0);
    return (
        <div className="w-full flex flex-col gap-3 items-center mt-7 justify-between p-3">
            <div className="w-full flex justify-between items-center  ">
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
                                        <label htmlFor="" className="text-sm">
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
                                        <label htmlFor="" className="text-sm">
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
                                        <span className="text-[18px]">752</span>
                                    </div>
                                    <hr className="bg-[#CDD5DE] mx-2 min-h-7 w-[1px] shrink-0 flex" />
                                    <div className="flex items-center gap-1 flex-col w-[40%]">
                                        <label
                                            htmlFor=""
                                            className="text-[#868A93] text-sm"
                                        >
                                            Posts
                                        </label>
                                        <span className="text-[18px]">752</span>
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
                    <Button
                        variant="secondary"
                        className="flex gap-1 rounded-full bg-[#EFF0F4] w-[81.64px] p-2 justify-center items-center"
                        onClick={() =>
                            setIsOpennedReply(
                                (isOpennedReply) => !isOpennedReply
                            )
                        }
                    >
                        <Image
                            src={reply_icon}
                            alt="logo"
                            width={13}
                            height={12}
                        />
                        <span className="text-[12px]">Reply</span>
                    </Button>
                    <div className="flex gap-1 rounded-full bg-[#EFF0F4] w-[81.64px] px-2 py-2  justify-between items-center">
                        <Image
                            src={upvote_icon}
                            alt="logo"
                            width={18}
                            height={18}
                            className="cursor-pointer"
                            onClick={() =>
                                setCountUpvoted(
                                    (countUpvoted) => countUpvoted + 1
                                )
                            }
                        />

                        <span className="text-[14px]">{countUpvoted}</span>

                        <Image
                            src={updown_icon}
                            alt="logo"
                            width={18}
                            height={18}
                            className="cursor-pointer"
                            onClick={() =>
                                setCountUpvoted(
                                    (countUpvoted) => countUpvoted - 1
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            <p>
                Back to working out after 20-25 days break, on day 2 of slim
                thigh challenge. I thought it would be easy, but god, it's
                killing me!!
            </p>
            {isOpennedReply && (
                <div className="w-full flex flex-col gap-1">
                    <h1 className="flex items-center p-1 font-semibold">
                        Reply To Comment
                    </h1>
                    <Textarea
                        placeholder="Write a reply"
                        className="rounded-lg bg-transparent p-3 text-[16px]"
                    />
                    <div className=" flex items-center justify-end gap-2 mt-3">
                        <Button
                            variant="default"
                            onClick={() => setIsOpennedReply(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="w-[188px] h-9 flex"
                        >
                            Reply
                        </Button>
                    </div>
                    <hr className="mt-3" />
                </div>
            )}

            <hr className="mt-3 w-full" />
        </div>
    );
};

export default Comment;
