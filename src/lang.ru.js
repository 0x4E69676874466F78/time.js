dateFormat.lang = {
	dayNames: [
		"Вск", "Пон", "Втр", "Срд", "Чтв", "Пят", "Суб",
		"Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"
	],
	monthNames: [
		"Янв", "Фев", "Мрт", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек",
		"Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
	]
};
timejs.lang = {
		justNow: 'только что',
		// past and future prefixes and suffixes
		pastPrefix: '',
		pastSuffix: ' назад',
		futurePrefix: 'через ',
		futureSuffix: '',
		onedayago: ' Вчера',
		twodaysago: ' Позавчера',
		today: ' Сегодня',
		at: ' в ',
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
			if (number % 10 === 1 && number % 100 !== 11)
				return number + ' ' + one;
			if (number % 10 > 1 && number % 10 < 5 && (number % 100 < 12 || number % 100 > 14))
				return number + ' ' + few;
			if (number % 10 === 0 || number % 10 > 4 || (number % 100 > 10 && number % 100 < 15))
				return number + ' ' + many;
			return number + ' ' + other;
		},
		minutes: function (_minutes) {
			return this.plural(_minutes, 'минуту', 'минуты', 'минут', 'минуты');
		},
		hours: function (_hours) {
			return this.plural(_hours, 'час', 'часа', 'часов', 'часа');
		},
		days: function (_days) {
			return this.plural(_days, 'день', 'дня', 'дней', 'дня');
		},
		weeks: function (_weeks) {
			return this.plural(_weeks, 'неделю', 'недели', 'недель', 'недели');
		},
		months: function (_months) {
			return this.plural(_months, 'месяц', 'месяца', 'месяцев', 'месяца');
		},
		years: function (_years) {
			return this.plural(_years, 'год', 'года', 'лет', 'года');
		}
};
