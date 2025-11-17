
import { ShareIcon } from "../icons/ShareIcon";
import { Tweet } from 'react-tweet';

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube"
}

//function to get the YouTube video ID
function getYouTubeId(url: string): string | null {
    try {
        const urlObj = new URL(url);

        // Handle standard youtube.com links
        // e.g., https://www.youtube.com/watch?v=VIDEO_ID
        if (urlObj.hostname.includes("youtube.com")) {
            const videoId = urlObj.searchParams.get('v');
            if (videoId) {
                return videoId;
            }
        }

        // Handle short youtu.be links
        // e.g., https://youtu.be/VIDEO_ID
        if (urlObj.hostname === "youtu.be") {
            const videoId = urlObj.pathname.split('/')[1];
            if (videoId) {
                return videoId;
            }
        }
    } catch (error) {
        console.error("Error parsing YouTube URL:", error);
    }

    // Return null if no ID is found
    return null;
}


export function Card({ title, link, type }: CardProps) {

    let tweetId: string | undefined = undefined;
    let youtubeEmbedUrl: string | undefined = undefined;

    if (type === "twitter") {
        try {
            const url = new URL(link);
            const pathParts = url.pathname.split('/');
            tweetId = pathParts.pop();
        } catch (error) {
            console.error("Failed to parse tweet URL:", link);
            tweetId = undefined;
        }
    }

    // --- THIS IS THE NEW LOGIC ---
    if (type === "youtube") {
        const videoId = getYouTubeId(link);
        if (videoId) {
            youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
    }
    // --- END OF NEW LOGIC ---

    return <div className="relative z-0">
        <div className="bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="pr-2 text-gray-500">
                        <ShareIcon />
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <ShareIcon />
                    </div>
                    <div className=" text-gray-500">
                        <ShareIcon />
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {/* Use the new youtubeEmbedUrl variable.
                  Only render the iframe if we successfully created a valid embed URL.
                */}
                {type === "youtube" && youtubeEmbedUrl && (
                    <iframe
                        className="w-full"
                        src={youtubeEmbedUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                    </iframe>
                )}

                {type === "twitter" && tweetId && (
                    <div className="max-h-[420px] overflow-y-auto p-2">
                        <Tweet id={tweetId} />
                    </div>
                )}

            </div>
        </div>
    </div>
}