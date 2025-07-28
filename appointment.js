document.addEventListener('DOMContentLoaded', function() {
    // Initialize date picker
    const datePicker = flatpickr("#appointmentDate", {
        minDate: "today",
        maxDate: new Date().fp_incr(60), // Allow booking up to 60 days in advance
        disable: [
            function(date) {
                // Disable Sundays
                return date.getDay() === 0;
            }
        ],
        locale: {
            firstDayOfWeek: 1 // Start week on Monday
        },
        onChange: function(selectedDates, dateStr) {
            generateTimeSlots(dateStr);
        }
    });

    // Store booked appointments
    const bookedAppointments = {};

    // Generate time slots based on selected date
    function generateTimeSlots(dateStr) {
        const timeSlotsContainer = document.getElementById('timeSlots');
        timeSlotsContainer.innerHTML = '';
        
        // Get day of week (0 = Sunday, 1 = Monday, etc.)
        const dayOfWeek = new Date(dateStr).getDay();
        
        // Define business hours
        let startHour = 9; // 9 AM
        let endHour = 17; // 5 PM
        
        // Saturday has shorter hours
        if (dayOfWeek === 6) {
            startHour = 10; // 10 AM
            endHour = 14; // 2 PM
        }
        
        // Generate time slots in 1-hour increments
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 60) {
                const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const slotKey = `${dateStr}_${timeStr}`;
                
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                timeSlot.textContent = timeStr;
                timeSlot.dataset.time = timeStr;
                
                // Check if this slot is already booked
                if (bookedAppointments[slotKey]) {
                    timeSlot.classList.add('booked');
                    timeSlot.title = 'Already booked';
                } else {
                    timeSlot.addEventListener('click', function() {
                        // Remove selected class from all time slots
                        document.querySelectorAll('.time-slot').forEach(slot => {
                            slot.classList.remove('selected');
                        });
                        
                        // Add selected class to this time slot
                        this.classList.add('selected');
                    });
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
            const selectedDate = document.getElementById('appointmentDate').value;
            const selectedTimeSlot = document.querySelector('.time-slot.selected');
            
            // Continue appointment.js
            if (!selectedDate) {
                alert('Please select a date for your appointment.');
                return;
            }
            
            if (!selectedTimeSlot) {
                alert('Please select a time slot for your appointment.');
                return;
            }
            
            const selectedTime = selectedTimeSlot.dataset.time;
            const slotKey = `${selectedDate}_${selectedTime}`;
            
            // Get form data
            const formData = new FormData(appointmentForm);
            const appointmentData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                therapist: formData.get('therapist'),
                date: selectedDate,
                time: selectedTime,
                notes: formData.get('notes'),
                firstVisit: formData.get('firstVisit') === 'on'
            };
            
            // Mark this slot as booked
            bookedAppointments[slotKey] = appointmentData;
            
            // Show confirmation modal
            showConfirmationModal(appointmentData);
            
            // Reset form
            appointmentForm.reset();
            
            // Clear selected time slot
            document.querySelectorAll('.time-slot').forEach(slot => {
                slot.classList.remove('selected');
            });
            
            // Update time slots to reflect the new booking
            generateTimeSlots(selectedDate);
        });
    }
    
    // Show confirmation modal with appointment details
    function showConfirmationModal(data) {
        const modal = document.getElementById('confirmationModal');
        const appointmentDetails = document.getElementById('appointmentDetails');
        
        // Format service name
        let serviceName = "Unknown Service";
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
            if (selectedOption) {
                serviceName = selectedOption.text;
            }
        }
        
        // Format therapist name
        let therapistName = "Any Available Therapist";
        if (data.therapist) {
            const therapistSelect = document.getElementById('therapist');
            if (therapistSelect) {
                const selectedOption = therapistSelect.options[therapistSelect.selectedIndex];
                if (selectedOption && selectedOption.value) {
                    therapistName = selectedOption.text;
                }
            }
        }
        
        // Format date
        const appointmentDate = new Date(data.date);
        const formattedDate = appointmentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Build details HTML
        appointmentDetails.innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Therapist:</strong> ${therapistName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p><strong>First Visit:</strong> ${data.firstVisit ? 'Yes' : 'No'}</p>
        `;
        
        // Show modal
        modal.style.display = 'flex';
    }
    
    // Close modal when clicking the close button or outside the modal
    const closeModal = document.querySelector('.close-modal');
    const closeModalBtn = document.getElementById('closeModal');
    const modal = document.getElementById('confirmationModal');
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Handle FAQ toggles
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle this FAQ item
            item.classList.toggle('active');
        });
    });
    
    // Add some sample booked appointments for demonstration
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    // Add some pre-booked slots
    bookedAppointments[`${formatDate(today)}_10:00`] = { name: "John Doe" };
    bookedAppointments[`${formatDate(today)}_14:00`] = { name: "Jane Smith" };
    bookedAppointments[`${formatDate(tomorrow)}_11:00`] = { name: "Robert Johnson" };
    bookedAppointments[`${formatDate(tomorrow)}_15:00`] = { name: "Emily Davis" };
});

