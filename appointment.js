document.addEventListener('DOMContentLoaded', function() {
    // Get current language
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // Initialize date picker with disabled Saturdays and Sundays
    const datePicker = flatpickr("#appointmentDate", {
        minDate: "today",
        maxDate: new Date().fp_incr(60), // Allow booking up to 60 days in advance
        locale: currentLang, // Set locale based on selected language
        disable: [
            function(date) {
                // Disable Saturdays (day 6) and Sundays (day 0)
                return date.getDay() === 0 || date.getDay() === 6;
            }
        ],
        onChange: function(selectedDates, dateStr) {
            generateTimeSlots(dateStr);
        }
    });

    // Rest of your code...


    // Generate time slots based on selected date
    function generateTimeSlots(dateStr) {
        const timeSlotsContainer = document.getElementById('timeSlots');
        timeSlotsContainer.innerHTML = '';
        
        if (!dateStr) {
            const message = translations[currentLang].selectDateFirst || 'Please select a date first';
            timeSlotsContainer.innerHTML = `<p class="select-date-message">${message}</p>`;
            return;
        }
        
        // Get day of week (0 = Sunday, 1 = Monday, etc.)
        const dayOfWeek = new Date(dateStr).getDay();
        
        // Don't generate slots for weekends
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Saturday or Sunday
            const closedMessage = translations[currentLang].closed || 'CLOSED';
            timeSlotsContainer.innerHTML = `<p class="error-message">${translations[currentLang].weekendClosed || 'We are closed on weekends. Please select a weekday.'}</p>`;
            return;
        }
        
        // Define business hours
        let startHour = 9; // 9 AM
        let endHour = 17; // 5 PM
        
        // Get existing appointments for this date
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const bookedTimes = appointments
            .filter(appointment => appointment.date === dateStr)
            .map(appointment => appointment.time);
        
        // Generate time slots in 1-hour increments
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 60) {
                const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                
                const isBooked = bookedTimes.includes(timeStr);
                const bookedText = translations[currentLang].booked || 'Booked';
                
                if (isBooked) {
                    timeSlot.classList.add('booked');
                    timeSlot.innerHTML = `
                        <input type="radio" id="time-${timeStr}" name="time" value="${timeStr}" disabled>
                        <label for="time-${timeStr}" class="booked">${timeStr} - ${bookedText}</label>
                    `;
                } else {
                    timeSlot.innerHTML = `
                        <input type="radio" id="time-${timeStr}" name="time" value="${timeStr}" required>
                        <label for="time-${timeStr}">${timeStr}</label>
                    `;
                }
                
                timeSlotsContainer.appendChild(timeSlot);
            }
        }
    }

    // Handle form submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get selected date and time
            const date = document.getElementById('appointmentDate').value;
            const selectedTimeInput = document.querySelector('input[name="time"]:checked');
            
            if (!date) {
                alert(translations[currentLang].selectDateAlert || 'Please select a date for your appointment.');
                return;
            }
            
            if (!selectedTimeInput) {
                alert(translations[currentLang].selectTimeAlert || 'Please select a time slot for your appointment.');
                return;
            }
            
            const time = selectedTimeInput.value;
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const serviceSelect = document.getElementById('service');
            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            const therapistSelect = document.getElementById('therapist');
            const therapist = therapistSelect.selectedIndex > 0 ? 
                therapistSelect.options[therapistSelect.selectedIndex].text : 
                (translations[currentLang].noPreference || 'Any Available');
            const notes = document.getElementById('notes').value;
            const firstVisit = document.getElementById('firstVisit').checked;
            
            // Create appointment object
            const appointment = {
                id: Date.now(), // Use timestamp as unique ID
                name,
                email,
                phone,
                service,
                therapist,
                date,
                time,
                notes,
                firstVisit,
                status: 'pending',
                created: new Date().toISOString(),
                notified: false
            };
            
            // Save to localStorage
            const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            appointments.push(appointment);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            
            console.log('Appointment saved:', appointment);
            
            // Show confirmation
            showConfirmation(appointment);
            
            // Reset form
            appointmentForm.reset();
            document.getElementById('timeSlots').innerHTML = `<p class="select-date-message">${translations[currentLang].selectDateFirst || 'Please select a date first'}</p>`;
        });
    }

    // Show confirmation modal
    function showConfirmation(appointment) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('confirmationModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'confirmationModal';
            modal.className = 'modal';
            
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">×</span>
                    <h2 data-i18n="appointmentConfirmed">${translations[currentLang].appointmentConfirmed || 'Appointment Confirmed'}</h2>
                    <div id="appointmentDetails"></div>
                    <button id="closeModal" class="submit-btn" data-i18n="close">${translations[currentLang].close || 'Close'}</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add event listeners to close modal
            document.querySelector('.close-modal').addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            document.getElementById('closeModal').addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        // Format date
        const formattedDate = new Date(appointment.date).toLocaleDateString(currentLang === 'sq' ? 'sq-AL' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Populate appointment details
        const appointmentDetails = document.getElementById('appointmentDetails');
        
        // Get translated labels
        const nameLabel = translations[currentLang].fullName?.replace('*', '') || 'Name:';
        const emailLabel = translations[currentLang].email?.replace('*', '') || 'Email:';
        const phoneLabel = translations[currentLang].phone?.replace('*', '') || 'Phone:';
        const serviceLabel = translations[currentLang].serviceType?.replace('*', '') || 'Service:';
        const therapistLabel = translations[currentLang].preferredTherapist?.replace('*', '') || 'Therapist:';
        const dateLabel = translations[currentLang].appointmentDate?.replace('*', '') || 'Date:';
        const timeLabel = 'Time:';
        const firstVisitLabel = translations[currentLang].firstVisit || 'First Visit:';
        const notesLabel = translations[currentLang].additionalNotes || 'Notes:';
        const yesText = currentLang === 'sq' ? 'Po' : 'Yes';
        const noText = currentLang === 'sq' ? 'Jo' : 'No';
        const confirmationText = currentLang === 'sq' ? 
            'Një email konfirmimi është dërguar në adresën tuaj të emailit.' : 
            'A confirmation email has been sent to your email address.';
        
        appointmentDetails.innerHTML = `
            <p><strong>${nameLabel}</strong> ${appointment.name}</p>
            <p><strong>${emailLabel}</strong> ${appointment.email}</p>
            <p><strong>${phoneLabel}</strong> ${appointment.phone}</p>
            <p><strong>${serviceLabel}</strong> ${appointment.service}</p>
            <p><strong>${therapistLabel}</strong> ${appointment.therapist}</p>
            <p><strong>${dateLabel}</strong> ${formattedDate}</p>
            <p><strong>${timeLabel}</strong> ${appointment.time}</p>
            <p><strong>${firstVisitLabel}</strong> ${appointment.firstVisit ? yesText : noText}</p>
            ${appointment.notes ? `<p><strong>${notesLabel}</strong> ${appointment.notes}</p>` : ''}
            <p class="confirmation-message">${confirmationText}</p>
        `;
        
        // Show modal
        modal.style.display = 'flex';
    }
});
