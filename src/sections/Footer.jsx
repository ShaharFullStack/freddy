export default function Footer() {
  return (
    <>
      <footer className="bg-[var(--color-dark)] text-[var(--color-sage)] py-10 border-t border-white/6 text-center">
        <div className="w-full max-w-[1180px] mx-auto px-5">
          <a href="#top" className="inline-flex items-center gap-3 justify-center mb-4">
            <img src="/logo.png" alt="לוגו" className="w-9 h-9 object-contain" />
            <span className="font-rubik font-black text-[1.1rem] text-[var(--color-primary)]">חיים שכאלה</span>
          </a>
          <p className="text-sm">ברק הפקות · פרדי ברק · הפקת תוכן והנחיית אירועים לארגונים</p>
          <p className="text-xs mt-2 opacity-50">© {new Date().getFullYear()} כל הזכויות שמורות</p>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a
        href={`https://wa.me/972528818148?text=${encodeURIComponent('היי, הגעתי דרך האתר ואשמח לפרטים על אירוע חיים שכאלה')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שלחו הודעה בוואטסאפ"
        className="fixed bottom-5 left-5 z-50 flex items-center bg-[#25d366] text-white rounded-full shadow-[0_14px_30px_-10px_rgba(37,211,102,0.6)] overflow-hidden group"
      >
        <span className="w-14 h-14 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="#fff" className="w-6 h-6">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.515zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-semibold text-sm transition-all duration-350 md:group-hover:max-w-[200px] md:group-hover:pl-4 md:group-hover:pr-5">
          דברו עם פרדי בוואטסאפ
        </span>
      </a>
    </>
  )
}
