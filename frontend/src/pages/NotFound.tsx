export default function NotFound() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-24 my-12">
            {/** 404 Not Found Text */}
            <div className="text-2xl md:text-4xl lg:6xl font-bold text-center text-black">
                404 Page Not Found
            </div>
            {/** 404 Not Found Image */}
            <div className="relative min-h-[20rem] w-full h-full flex justify-center">
                <img
                    alt="404 Not Found Image"
                    src="/404.svg"
                    className="object-contain h-full absolute"
                />
            </div>
        </div>
    );
}