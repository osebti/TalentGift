// components
import Button from "@/components/Button";
import NavBar from "@/components/NavBar";

interface Step {
  title: string;
  content: string;
  color: string;
}

interface Reason {
  title: string;
  content: string;
  imgSource: string;
  color: string;
}

export default function Home() {
  const steps: Step[] = [
    {
      title: "Create an Organization",
      content:
        "Empower your team to navigate corporate challenges.",
      color: "bg-lightPurple",
    },
    {
      title: "Take a Survey",
      content: "Share your thoughts and make your voice count!",
      color: "bg-darkPurple",
    },
    {
      title: "Receive Feedback",
      content:
        "Keep your team engaged with personalized notifications and insights.",
      color: "bg-green",
    },
  ];

  const reasons: Reason[] = [
    {
      title: "Employee Engagement",
      content:
        "Open up the channels and lend an ear to your incredible team. By actively listening to your employees, you're not just making decisions—you're orchestrating a symphony of collaboration, paving the way for meaningful change within your organization.",
      imgSource: "/engineer_team.svg",
      color: "bg-lightPurple",
    },
    {
      title: "Performance Management",
      content:
        "Elevate your teams to new heights by fostering ongoing conversations. From anytime feedback and goal tracking to development-focused reports and enriched 1-on-1s, we empower you to build high-performing teams that thrive.",
      imgSource: "/pie_graph.svg",
      color: "bg-darkPurple",
    },
    {
      title: "Employee Development",
      content:
        "Nurture and keep your talent flourishing through personalized, continuous development that's not only easy to measure but also scalable for sustained growth.",
      imgSource: "/report.svg",
      color: "bg-green",
    },
  ];

  return (
    <div className="flex flex-col gap-y-16 mt-4">
      <NavBar hideButton={false} className="mx-4 md:mx-8" />
      {/* Hero Section */}
      <section className="relative grid grid-cols-1 sm:gap-x-20 sm:grid-cols-2 place-items-center px-4 md:px-8 md:py-20">
        <div className="absolute w-full h-full bg-lightPurple opacity-20 z-[-1]"></div>
        <div className="flex flex-col gap-y-8">
          <h1 className="font-semibold text-center md:text-start text-2xl md:text-3xl lg:text-6xl text-black opacity-90">
            Thrive Together for a Vibrant Workplace Culture
          </h1>
          <p className="text-sm md:text-base text-center md:text-start">
            Equip your organization with essential tools and insights for
            employee engagement, performance, and growth.
          </p>
          <div className="flex justify-between mx-8 md:mx-0 gap-x-8">
            <Button
              id="join-now"
              label="Join Now"
              href="/sign-up"
              navigate
              style="btn-secondary flex-grow"
            />
            <Button
              id="our-goals"
              label="Our goals"
              style="btn-accent flex-grow"
              onClick={() => {
                const elem: HTMLElement | null =
                  document.getElementById("goals");
                elem?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        </div>
        <div className="relative min-h-[20rem] w-full h-full col-start-2 flex justify-center my-[8%]">
          <img
            alt="Mindset"
            src="/mindset.svg"
            className="object-contain h-full absolute"
          />
        </div>
      </section>
      {/* How does it work? */}
      <section className="px-4 md:px-8 flex flex-col gap-y-16">
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
          How does it work?
        </h1>
        <div className="flex flex-col lg:flex-row gap-y-4 md:gap-x-2 lg:gap-x-4">
          {steps.map((elem, index) => {
            return (
              <div
                key={index}
                className="card lg:w-1/3 min-h-[14rem] cursor-pointer group"
              >
                <div
                  className={`card-body relative text-white text-center lg:group-hover:translate-y-4 transition ease-in-out`}
                >
                  <div
                    className={`absolute ${elem.color} top-0 left-0 w-full h-full z-[-1] opacity-[0.90]`}
                  ></div>
                  <h2 className="font-semibold text-lg md:text-2xl whitespace-nowrap">
                    {elem.title}
                  </h2>
                  <p className="text-sm md:text-base mt-[8%]">
                    {elem.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* Why Us? */}
      <section id="goals" className="px-4 md:px-8 flex flex-col gap-y-8">
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl pt-4 md:pt-8">
          Why Us?
        </h1>
        {/* desktop layout */}
        {reasons.map((elem, index) => {
          return (
            <div
              key={index}
              className="md:grid md:grid-cols-2 grid-rows-1 place-items-center gap-x-8 group hidden"
            >
              {index % 2 == 1 ? (
                <div className="relative min-h-[20rem] w-full h-full flex justify-center my-[4%]">
                  <img
                    alt="Illustrations"
                    src={elem.imgSource}
                    className="object-contain h-full absolute"
                  ></img>
                </div>
              ) : null}
              <div className="flex flex-col gap-y-4">
                <h2 className="text-darkPurple font-semibold text-2xl md:text-3xl group-hover:text-lightPurple transition ease-in-out">
                  {elem.title}
                </h2>
                <p className="text-base md:text-lg">{elem.content}</p>
              </div>
              {index % 2 == 0 ? (
                <div className="relative min-h-[20rem] w-full h-full flex justify-center my-[4%]">
                  <img
                    alt="illustrations"
                    src={elem.imgSource}
                    className="object-contain h-full absolute"
                  ></img>
                </div>
              ) : null}
            </div>
          );
        })}
        {/* mobile layout */}
        <div className="flex flex-col gap-y-4 md:hidden">
          {reasons.map((elem, index) => {
            return (
              <div key={index} className="card min-h-[14rem] cursor-pointer">
                <div className={`card-body relative text-white text-center`}>
                  <div
                    className={`absolute ${elem.color} top-0 left-0 w-full h-full z-[-1] opacity-[0.90]`}
                  ></div>
                  <h2 className="font-semibold text-lg whitespace-nowrap">
                    {elem.title}
                  </h2>
                  <p className="text-base mt-[8%]">{elem.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
