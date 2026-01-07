interface EventDetailsProps {
  location: {
    address: string[];
    googleMapsUrl: string;
    wazeUrl: string;
  };
  dateTime: {
    date: string;
    time: string;
  };
  contacts: Array<{
    name: string;
    phone: string;
  }>;
}

export function EventDetails({ location, dateTime, contacts }: EventDetailsProps) {
  return (
    <section 
      className="bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#C9A227]/40 px-4 sm:px-6 md:px-8 py-6 sm:py-8 space-y-6"
      style={{ boxShadow: "0 8px 32px rgba(139, 90, 43, 0.12), 0 4px 16px rgba(0,0,0,0.06)" }}
    >
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Location */}
        <div className="space-y-3 text-center sm:text-left">
          <h3
            className="text-lg sm:text-xl font-semibold text-[#1A5F5A] flex items-center justify-center sm:justify-start gap-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-xl sm:text-2xl">📍</span> Location
          </h3>
          <div
            className="text-[#5D4E37] text-sm sm:text-base leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {location.address.map((line, i) => (
              <span key={i}>
                {line}
                {i < location.address.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-center sm:items-start gap-2 pt-2">
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded-full border border-[#1A5F5A] bg-white/80 text-[#1A5F5A] text-xs sm:text-sm font-medium hover:bg-[#1A5F5A] hover:text-white transition-colors duration-200 shadow-sm text-center"
            >
              Open in Google Maps
            </a>
            <a
              href={location.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded-full border border-[#1A5F5A] bg-white/80 text-[#1A5F5A] text-xs sm:text-sm font-medium hover:bg-[#1A5F5A] hover:text-white transition-colors duration-200 shadow-sm text-center"
            >
              Navigate with Waze
            </a>
          </div>
        </div>

        {/* Date & Time */}
        <div className="space-y-3 text-center sm:text-left">
          <h3
            className="text-lg sm:text-xl font-semibold text-[#1A5F5A] flex items-center justify-center sm:justify-start gap-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-xl sm:text-2xl">📅</span> Date & Time
          </h3>
          <p
            className="text-[#5D4E37] text-sm sm:text-base leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {dateTime.date}
            <br />
            {dateTime.time}
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-3 text-center sm:text-left sm:col-span-2 lg:col-span-1">
          <h3
            className="text-lg sm:text-xl font-semibold text-[#1A5F5A] flex items-center justify-center sm:justify-start gap-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-xl sm:text-2xl">📞</span> Contact
          </h3>
          <div
            className="text-[#5D4E37] text-sm sm:text-base leading-relaxed space-y-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {contacts.map((contact, i) => (
              <p key={i}>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-[#1A5F5A] hover:underline transition-colors duration-200"
                >
                  {contact.phone}
                </a>
                <span className="text-xs sm:text-sm text-[#5D4E37]/70 block">
                  {contact.name}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
