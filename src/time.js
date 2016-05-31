"use strict";

/**
 * Time.js — time tags humanization in HTML documents.
 *
 * @author MaximAL, NightFox
 * @link https://github.com/maximal/time.js
 * @copyright © MaximAL 2013-2014, NightFox 2015
 */

var timer;
var timejs = {

	/**
	 * Update interval in milliseconds
	 */
	startDelay: 500,
	updateInterval: 5000,
	
	/**
	 * Debug mode
	 */
	debug: false,


	/**
	 * Date humanization
	 * @param time String or Date object representing given date and time // на вход время в UTC, пример: 2015-10-15T16:16:40Z
	 * @returns {*}
	 */
	humaneDate: function (time) {
		var date = new Date((time || '').replace(/-/g, '/').replace(/[TZ]/g, ' '));
		var date_raw = new Date(time);
		var date_now = new Date();
		var offset = date_now.getTimezoneOffset();
		var date_utc = new Date(date_now.getTime() + (offset * 60000));
		//var offsetHours = Math.floor(offset / 60);
		//var offsetPrefix = offset < 0 ? "+" : "-";

		var diff = ((date_utc - date.getTime()) / 1000);
		// новый день
		var date_utc_newday = new Date(date_utc);
 			date_utc_newday.setDate(date_utc.getDate() + 1);
 			date_utc_newday.setHours(0);
 			date_utc_newday.setMinutes(0);
 			date_utc_newday.setSeconds(0);
		// Учитываем что день начинается с 00
		var dayDiff = Math.floor(
			(
				(
					date_utc - date.getTime() - (date_raw - date_utc_newday) - (date_utc - date.getTime()) // разобраться с этим чудовищем
				) / 1000
			) / 86400
		);

		var lang = this.lang;
		if (diff < 59)
			return lang.justNow;

 		var minutes = (date_raw.getMinutes()<10?'0':'') + date_raw.getMinutes();
 		var hours = (date_raw.getHours()<10?'0':'') + date_raw.getHours();
 		var day = (date_raw.getDate()<10?'0':'') + date_raw.getDate();
 		var month = (date_raw.getMonth()+1<10?'0':'') + (date_raw.getMonth()+1);
 		var year = date_raw.getFullYear();

		return (
			  diff < 2700   && lang.pastPrefix + lang.minutes(Math.round(diff / 60))              + lang.pastSuffix ||
			  diff < 18000  && lang.pastPrefix + lang.hours(Math.round(diff / 3600))              + lang.pastSuffix // только если часов не больше 5
			)
			|| dayDiff === 0   && lang.pastPrefix + lang.today                                    + lang.at + date_raw.format(lang.timeformat)
			|| dayDiff === 1   && lang.pastPrefix + lang.onedayago                                + lang.at + date_raw.format(lang.timeformat)
			|| dayDiff === 2   && lang.pastPrefix + lang.twodaysago                               + lang.at + date_raw.format(lang.timeformat)
			|| dayDiff < 7     && lang.pastPrefix + lang.days(dayDiff)                            + lang.pastSuffix + ' (' + date_raw.format(lang.dateformat) + ')'
//			|| dayDiff < 25    && lang.pastPrefix + lang.weeks(Math.round(dayDiff / 7))           + lang.pastSuffix + ' (' + date_raw.format(lang.dateformat) + ')'
//			|| dayDiff < 300   && lang.pastPrefix + lang.months(Math.round(dayDiff / 30.4375))    + lang.pastSuffix + ' (' + date_raw.format(lang.dateformat) + ')'
			|| dayDiff >= 7     && lang.pastPrefix + date_raw.format(lang.dateformat);
//			|| dayDiff < 365   && lang.pastPrefix + lang.years(Math.round(dayDiff / 365.25))      + lang.pastSuffix
			//date.toLocaleDateString();
	},




	/**
	 * Initialization on DOM ready
	 */
	init: function() {
		var self = this;

		// Update of all <time> tags
		var updateTimes = function () {
			self.debug && console.info && console.info(self);
			var elems = document.getElementsByTagName('time');
			for (var i = 0; i < elems.length; i++) {
				var elem = elems[i];
				var datetime = elem.getAttribute('datetime');
				if (datetime) {
					elem.textContent = self.humaneDate(datetime);
					//elem.textContent = (new Date(datetime));
					self.debug && console.info(self.humaneDate(datetime)); // вывести инфу
					!elem.getAttribute('title') && elem.setAttribute('title', (new Date(datetime)).toLocaleString());
				}
			}
			// Останавливаем таймер запуска
			if (typeof startTimer !== "undefined") {
				clearInterval(startTimer);
				startTimer = undefined;
				// Updating all times on page and setting timers if updateInterval > 0
				if (self.updateInterval && self.updateInterval > 0) {
					setInterval(updateTimes, self.updateInterval);
				}
			}
		};
		// Multiple initialization prevention
		var initOnLoadCalled = false;
		var initOnLoad = function () {
			if (initOnLoadCalled) { return; }
			initOnLoadCalled = true;
			updateTimes();
			// запуск
			var startTimer = setInterval(updateTimes, self.startDelay);
		};

		// DOM content ready event listeners
		addEventListener('DOMContentLoaded', initOnLoad, false);
		addEventListener('load', initOnLoad, false);
	}
	
};
