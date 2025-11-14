import React from "react";

const Map = () => {
	return (
		<div className="h-64 w-full rounded-xl overflow-hidden border border-gray-200">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1270521.372306993!2d-1.2076467222656252!3d5.814010595263086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2e7a773%3A0xbed14ed8650e2dd3!2sAccra!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
				width="100%"
				height="100%"
				style={{ border: 0 }}
				allowFullScreen=""
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				title="Accra, Ghana Location"
			/>
		</div>
	);
};

export default Map;
