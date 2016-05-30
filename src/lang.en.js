dateFormat.lang = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};
timejs.lang = {
		justNow: 'just now',
		// past and future prefixes and suffixes
		pastPrefix: '',
		pastSuffix: ' ago',
		futurePrefix: 'in ',
		futureSuffix: '',
		onedayago: ' Yesterday',
		twodaysago: ' Two days ago',
		today: ' Today',
		at: ' at ',
		timeformat: "HH:MM:ss",
		dateformat: "dd.mm.yyyy HH:MM:ss",

		/**
		 * Plural forms
		 * @link http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html
		 *
		 * @param number
		 * @param one
		 * @param few
		 * @param many
		 * @param other
		 * @returns {*}
		 */
		plural: function (number, one, few, many, other) {
			// Default is Russian:
			//     one   → n mod 10 is 1 and n mod 100 is not 11;
			//     few   → n mod 10 in 2..4 and n mod 100 not in 12..14;
			//     many  → n mod 10 is 0 or n mod 10 in 5..9 or n mod 100 in 11..14;
			//     other → everything else.
			if (number === 1)
				return one;
			return number + ' ' + other;
		},
		minutes: function (_minutes) {
			return this.plural(_minutes, 'minute', 'minutes', 'minutes', 'minutes');
		},
		hours: function (_hours) {
			return this.plural(_hours, 'hour', 'hours', 'hours', 'hours');
		},
		days: function (_days) {
			return this.plural(_days, 'day', 'days', 'days', 'days');
		},
		weeks: function (_weeks) {
			return this.plural(_weeks, 'week', 'weeks', 'weeks', 'weeks');
		},
		months: function (_months) {
			return this.plural(_months, 'month', 'months', 'months', 'months');
		},
		years: function (_years) {
			return this.plural(_years, 'year', 'years', 'years', 'years');
		}
};
