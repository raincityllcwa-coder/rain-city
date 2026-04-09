import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import imgProjectImage from "@/assets/3b944e1ac697f301b31561de640dda3557f43d69.webp?url";
import imgProjectImage1 from "@/assets/1a9ff41667e1b1a100603f9ba342b2a853274b6f.webp?url";
import imgProjectImage2 from "@/assets/e1d045053d612f0796a40f57ca1c648d52fa7407.webp?url";
import imgMoreButton from "@/assets/3b437988bfed0d43dea56bac02897e2e85c27e71.webp?url";

// Hardcoded fallback (used when Sanity has no data yet)
const fallbackProjects = [
  {
    image: imgProjectImage,
    title: "Kitchen in Bellevue",
    description: "Kitchen cabinets design and installation.",
    gallery: [imgProjectImage, imgProjectImage1, imgProjectImage2],
  },
  {
    image: imgProjectImage1,
    title: "Kitchen in Kirkland",
    description: "Full kitchen renovation, flooring, appliances installation.",
    gallery: [imgProjectImage1, imgProjectImage, imgProjectImage2],
  },
  {
    image: imgProjectImage2,
    title: "Kitchen in Seattle",
    description: "Kitchen cabinets design and installation, countertop installation.",
    gallery: [imgProjectImage2, imgProjectImage1, imgProjectImage],
  },
  {
    image: imgProjectImage,
    title: "Bathroom in Redmond",
    description: "Complete bathroom renovation with modern fixtures.",
    gallery: [imgProjectImage, imgProjectImage2, imgProjectImage1],
  },
  {
    image: imgProjectImage1,
    title: "Kitchen in Sammamish",
    description: "Custom kitchen cabinets and quartz countertops.",
    gallery: [imgProjectImage1, imgProjectImage, imgProjectImage2],
  },
  {
    image: imgProjectImage2,
    title: "Bathroom in Tacoma",
    description: "Luxury bathroom remodel with heated floors.",
    gallery: [imgProjectImage2, imgProjectImage, imgProjectImage1],
  },
];

interface ProjectItem {
  image: string;
  title: string;
  description: string;
  gallery: string[];
}

interface Props {
  projects?: ProjectItem[];
}

export function ProjectsSection({ projects }: Props) {
  const allProjects = projects && projects.length > 0 ? projects : fallbackProjects;

  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const touchState = useRef({ startX: 0, startY: 0, swiped: false });

  const visibleProjects = allProjects.slice(0, visibleCount);
  const hasMore = visibleCount < allProjects.length;

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, allProjects.length));
  };

  const openLightbox = (project: ProjectItem) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = useCallback(() => {
    setSelectedProject((prev) => {
      if (!prev) return null;
      setCurrentImageIndex((i) => (i === prev.gallery.length - 1 ? 0 : i + 1));
      return prev;
    });
  }, []);

  const prevImage = useCallback(() => {
    setSelectedProject((prev) => {
      if (!prev) return null;
      setCurrentImageIndex((i) => (i === 0 ? prev.gallery.length - 1 : i - 1));
      return prev;
    });
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // Native touch listeners with { passive: false }
  useEffect(() => {
    const el = lightboxRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchState.current.startX = e.touches[0].clientX;
      touchState.current.startY = e.touches[0].clientY;
      touchState.current.swiped = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = touchState.current.startX - endX;
      const diffY = Math.abs(touchState.current.startY - endY);

      if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
        touchState.current.swiped = true;
        if (diffX > 0) nextImage();
        else prevImage();
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [selectedProject, nextImage, prevImage]);

  const handleBackdropClick = () => {
    if (!touchState.current.swiped) {
      closeLightbox();
    }
    touchState.current.swiped = false;
  };

  return (
    <section id="projects" className="w-full py-12 md:py-16 lg:py-20">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8">
        <h2 className="font-['Lora'] font-bold text-[28px] md:text-[32px] text-black mb-8 md:mb-11">
          Our Projects
        </h2>

        <div className="flex flex-col gap-[52px] items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-[24px] w-full">
            {visibleProjects.map((project, index) => (
              <div
                key={index}
                className="flex flex-col gap-[21px] cursor-pointer"
                onClick={() => openLightbox(project)}
              >
                <div className="h-[240px] md:h-[279px] rounded-[5px] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-['Lora'] font-bold text-[22px] md:text-[24px] text-[#3b350e]">
                  {project.title}
                </h3>
                <p className="font-['Montserrat'] font-normal text-[16px] text-black">
                  {project.description}
                </p>
              </div>
            ))}
          </div>

          {hasMore && (
            <button
              onClick={handleViewMore}
              className="bg-white border border-[#989898] rounded-[5px] h-[55px] px-[30px] flex items-center gap-[14px] hover:bg-gray-50 transition-colors"
            >
              <img src={imgMoreButton} alt="" className="size-[21px] object-cover" />
              <span className="font-['Montserrat'] font-normal text-[16px] text-black">
                View More
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selectedProject && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          {selectedProject.gallery.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
            </button>
          )}

          <div
            className="relative flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center">
              <img
                src={selectedProject.gallery[currentImageIndex]}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg"
              />
            </div>
            <div className="text-center text-white px-4">
              <h3 className="font-['Lora'] font-bold text-xl md:text-2xl mb-2">
                {selectedProject.title}
              </h3>
              <p className="font-['Montserrat'] text-sm md:text-base text-gray-300">
                {selectedProject.description}
              </p>
              {selectedProject.gallery.length > 1 && (
                <p className="font-['Montserrat'] text-xs md:text-sm text-gray-400 mt-2">
                  {currentImageIndex + 1} / {selectedProject.gallery.length}
                </p>
              )}
            </div>
          </div>

          {selectedProject.gallery.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
