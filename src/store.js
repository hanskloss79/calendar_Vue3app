import { reactive } from 'vue';
import { seedData } from './seed.js';

export const store = {
    state: {
        data: reactive(seedData)
    },
    getActiveDay() {
        return this.state.data.find((day) => day.active);
    },
    setActiveDay(dayId) {
        this.state.data.map((dayObj) => {
            dayObj.id === dayId ? dayObj.active = true : dayObj.active = false;
        })
    },
    submitEvent(eventDetails) {
        const activeDay = this.getActiveDay();
        activeDay.events.push({ "details": eventDetails, "edit": false });
    },
    // sets all events to the non-edit state prior to toggling the targeted event
    resetEditOfAllEvents() {
        this.state.data.map((dayObj) => {
            dayObj.events.map((event) => {
                event.edit = false;
            });
        });
    },

    getEventObj(dayId, eventDetails) {
        const dayObj = this.state.data.find((day) => day.id === dayId);
        return dayObj.events.find((event) => event.details === eventDetails);
    },

    // edition of event in calendar
    editEvent(dayId, eventDetails) {
        this.resetEditOfAllEvents();
        const eventObj = this.getEventObj(dayId, eventDetails);
        eventObj.edit = true;
    },

    // updating data of calendar event
    updateEvent(dayId, originalEventDetails, newEventDetails) {
        const eventObj = this.getEventObj(dayId, originalEventDetails);
        eventObj.details = newEventDetails;
        eventObj.edit = false;
    },

    // removing event from calendar
    deleteEvent(dayId, eventDetails){
        const dayObj = this.state.data.find((day) => day.id === dayId);
        const eventIndexToRemove = dayObj.events.findIndex(
            event => event.details === eventDetails
        );
        dayObj.events.splice(eventIndexToRemove, 1); 
    }

}