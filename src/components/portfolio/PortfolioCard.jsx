import { useInView } from "../../App";

export default function PortfolioCard({ item, delay ,setVideoOpen , setUrl}) {
  const [ref, visible] = useInView(0.1);
  return (
    <div onClick={()=>{
     if(item.type == "video"){
       setVideoOpen(true)
      setUrl(item.link)
     }
    }}
      ref={ref}
      className={`group relative bg-white/3 border border-white/[0.07] rounded-2xl overflow-hidden cursor-pointer hover:border-white/15 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}s`, transition: "opacity 0.7s ease, transform 0.7s ease, border-color 0.3s" }}
    >
      {/* Thumbnail */}
      <div className={`h-48 bg-linear-to-br ${item.bg} flex items-center justify-center relative overflow-hidden group`}>
  
  {item.thumbnail ? (
    <img
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      src={item.thumbnail}
      alt="thumbnail"
    />
  ) : (
    <span className="text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
      {item.emoji}
    </span>
  )}

  

</div>

      {/* Footer */}
      <div className="p-4">
        <p className="text-sm font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>{item.title}</p>
        <p className={`text-xs mt-1 ${item.accent}`}>{item.sub}</p>
      </div>
    </div>
  );
}