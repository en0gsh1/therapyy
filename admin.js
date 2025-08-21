// Admin Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS if it's available
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS user ID
    }
    
    // Check if user is logged in (for dashboard pages)
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const isLoginPage = document.getElementById('adminLoginForm');
    const isDashboardPage = document.getElementById('appointmentsTableBody');
    
    if (isDashboardPage && !adminLoggedIn && !isLoginPage) {
        window.location.href = 'admin-login.html';
    }
    
    // Handle admin login
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        const togglePassword = document.getElementById('togglePassword');
        
        if (togglePassword) {
            togglePassword.addEventListener('click', function() {
                const passwordInput = document.getElementById('adminPassword');
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                this.querySelector('i').classList.toggle('fa-eye');
                this.querySelector('i').classList.toggle('fa-eye-slash');
            });
        }
        
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const passwordInput = document.getElementById('adminPassword');
            const passwordError = document.getElementById('passwordError');
            const password = passwordInput.value;
            
            if (password === '6038') {
                // Set logged in flag
                sessionStorage.setItem('adminLoggedIn', 'true');
                
                // Redirect to dashboard
                window.location.href = 'admin-dashboard.html';
            } else {
                passwordError.textContent = 'Incorrect password. Please try again.';
                passwordInput.value = '';
                
                adminLoginForm.classList.add('shake');
                setTimeout(() => {
                    adminLoginForm.classList.remove('shake');
                }, 500);
            }
        });
    }
    
    // Mobile sidebar toggle
    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    const adminSidebar = document.getElementById('adminSidebar');
    
    if (menuToggleBtn && adminSidebar) {
        menuToggleBtn.addEventListener('click', function() {
            adminSidebar.classList.toggle('expanded');
        });
    }
    
    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.admin-menu li a');
    if (sidebarLinks.length > 0) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    
                    // Remove active class from all links
                    sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
                    
                    // Add active class to clicked link
                    this.parentElement.classList.add('active');
                    
                    // On mobile, collapse the sidebar after clicking
                    if (window.innerWidth <= 768) {
                        adminSidebar.classList.remove('expanded');
                    }
                    
                    // Show the corresponding section
                    showSection(targetId.substring(1));
                }
            });
        });
        
        // Function to show the selected section and hide others
        function showSection(sectionId) {
            const sections = document.querySelectorAll('.admin-section');
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            const activeSection = document.getElementById(sectionId + '-section');
            if (activeSection) {
                activeSection.style.display = 'block';
            }
        }
        
        // Initialize with the first section visible
        showSection('appointments');
    }
    
    // Appointment management
    const appointmentsTableBody = document.getElementById('appointmentsTableBody');
    const pendingAlert = document.getElementById('pendingAlert');
    const pendingCount = document.getElementById('pendingCount');
    const emptyState = document.getElementById('emptyState');
    
    if (appointmentsTableBody) {
        // Load appointments
        loadAppointments();
        updatePendingCount();
        
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter appointments
                const filter = this.getAttribute('data-filter');
                filterAppointments(filter);
            });
        });
        
        // Search functionality
        const appointmentSearch = document.getElementById('appointmentSearch');
        if (appointmentSearch) {
            appointmentSearch.addEventListener('input', function() {
                searchAppointments(this.value);
            });
        }
    }
    
    // New Appointment Modal
    const newAppointmentBtn = document.getElementById('newAppointmentBtn');
    const appointmentModal = document.getElementById('appointmentModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancelAppointment');
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (newAppointmentBtn && appointmentModal) {
        newAppointmentBtn.addEventListener('click', function() {
            appointmentModal.style.display = 'block';
        });
    }
    
    if (closeModal && appointmentModal) {
        closeModal.addEventListener('click', function() {
            appointmentModal.style.display = 'none';
        });
    }
    
    if (cancelBtn && appointmentModal) {
        cancelBtn.addEventListener('click', function() {
            appointmentModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === appointmentModal) {
            appointmentModal.style.display = 'none';
        }
        
        if (event.target === refusalModal) {
            refusalModal.style.display = 'none';
        }
    });
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const patientName = document.getElementById('patientName').value;
            const appointmentDate = document.getElementById('appointmentDate').value;
            const appointmentTime = document.getElementById('appointmentTime').value;
            const serviceType = document.getElementById('serviceType').value;
            const therapist = document.getElementById('therapist').value;
            const status = document.getElementById('status').value;
            
            // Create new appointment
            const newAppointment = {
                id: Date.now(), // Use timestamp as unique ID
                patientName: patientName,
                date: appointmentDate,
                time: appointmentTime,
                service: serviceType,
                therapist: therapist,
                status: status,
                email: 'patient@example.com' // In a real app, you'd have this from the user's profile
            };
            
            // Add to appointments array
            appointments.unshift(newAppointment);
            
            // Save to localStorage
            saveAppointments();
            
            // Reload appointments table
            loadAppointments();
            updatePendingCount();
            
            // Close modal
            appointmentModal.style.display = 'none';
            
            // Reset form
            appointmentForm.reset();
        });
    }
    
    // Refusal Modal
    const refusalModal = document.getElementById('refusalModal');
    const closeRefusalModal = document.getElementById('closeRefusalModal');
    const cancelRefusal = document.getElementById('cancelRefusal');
    const confirmRefusal = document.getElementById('confirmRefusal');
    let currentAppointmentId = null;
    
    if (closeRefusalModal) {
        closeRefusalModal.addEventListener('click', function() {
            refusalModal.style.display = 'none';
        });
    }
    
    if (cancelRefusal) {
        cancelRefusal.addEventListener('click', function() {
            refusalModal.style.display = 'none';
        });
    }
    
    if (confirmRefusal) {
        confirmRefusal.addEventListener('click', function() {
            const reason = document.getElementById('refusalReason').value;
            
            if (!reason.trim()) {
                alert('Please provide a reason for refusing the appointment.');
                return;
            }
            
            refuseAppointment(currentAppointmentId, reason);
            refusalModal.style.display = 'none';
            document.getElementById('refusalReason').value = '';
        });
    }
    
    // Pagination
    const itemsPerPage = 5;
    let currentPage = 1;
    let filteredAppointments = [];
    
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const paginationNumbers = document.getElementById('paginationNumbers');
    
    if (prevPageBtn && nextPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayAppointments();
                updatePagination();
            }
        });
        
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayAppointments();
                updatePagination();
            }
        });
    }
});

// Sample appointments data (in a real app, this would come from a database)
let appointments = [
    {
        id: 1,
        patientName: 'John Smith',
        email: 'john@example.com',
        date: '2025-07-30',
        time: '09:00',
        service: 'Sports Physiotherapy',
        therapist: 'Dr. Sarah Johnson',
        status: 'pending'
    },
    {
        id: 2,
        patientName: 'Emily Davis',
        email: 'emily@example.com',
        date: '2025-07-30',
        time: '11:30',
        service: 'Post-Surgery Rehab',
        therapist: 'Dr. Michael Chen',
        status: 'confirmed'
    },
    {
        id: 3,
        patientName: 'Robert Wilson',
        email: 'robert@example.com',
        date: '2025-07-31',
        time: '14:00',
        service: 'Chronic Pain Management',
        therapist: 'Dr. Emily Rodriguez',
        status: 'pending'
    },
    {
        id: 4,
        patientName: 'Sarah Johnson',
        email: 'sarah@example.com',
        date: '2025-08-01',
        time: '10:00',
        service: 'Sports Physiotherapy',
        therapist: 'Dr. David Kim',
        status: 'cancelled'
    },
    {
        id: 5,
        patientName: 'Michael Brown',
        email: 'michael@example.com',
        date: '2025-08-02',
        time: '15:30',
        service: 'Neurological Rehabilitation',
        therapist: 'Dr. Sarah Johnson',
        status: 'confirmed'
    },
    {
        id: 6,
        patientName: 'Jennifer Lee',
        email: 'jennifer@example.com',
        date: '2025-08-03',
        time: '09:30',
        service: 'Post-Surgery Rehab',
        therapist: 'Dr. Michael Chen',
        status: 'completed'
    }
];

// Check if there are saved appointments in localStorage
function loadSavedAppointments() {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
        appointments = JSON.parse(savedAppointments);
    }
}

// Save appointments to localStorage
function saveAppointments() {
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Load appointments when the page loads
loadSavedAppointments();

// Function to load appointments into the table
function loadAppointments() {
    const appointmentsTableBody = document.getElementById('appointmentsTableBody');
    if (!appointmentsTableBody) return;
    
    // Set filtered appointments to all appointments initially
    filteredAppointments = [...appointments];
    
    // Display the first page
    currentPage = 1;
    displayAppointments();
    updatePagination();
}

// Function to display appointments for the current page
function displayAppointments() {
    const appointmentsTableBody = document.getElementById('appointmentsTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (!appointmentsTableBody) return;
    
    // Clear the table
    appointmentsTableBody.innerHTML = '';
    
    // Check if there are any appointments
    if (filteredAppointments.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        return;
    } else {
        if (emptyState) emptyState.style.display = 'none';
    }
    
    // Calculate start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredAppointments.length);
    
    // Display appointments for the current page
    for (let i = startIndex; i < endIndex; i++) {
        const appointment = filteredAppointments[i];
        
        // Format date to be more readable
        const appointmentDate = new Date(appointment.date);
        const formattedDate = appointmentDate.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Create table row
        const row = document.createElement('tr');
        
        // Create action buttons based on status
        let actionButtons = '';
        
        if (appointment.status === 'pending') {
            actionButtons = `
                <button class="approve-btn" data-id="${appointment.id}">
                    <i class="fas fa-check"></i> Approve
                </button>
                <button class="refuse-btn" data-id="${appointment.id}">
                    <i class="fas fa-times"></i> Refuse
                </button>
            `;
        } else {
            actionButtons = `
                <div class="table-actions">
                    <button title="Edit" data-id="${appointment.id}" class="edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button title="Delete" data-id="${appointment.id}" class="delete-btn">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <button title="View Details" data-id="${appointment.id}" class="view-btn">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            `;
        }
        
        // Set row content
        row.innerHTML = `
            <td>${appointment.patientName}</td>
            <td>${formattedDate}</td>
            <td>${appointment.time}</td>
            <td>${appointment.service}</td>
            <td>${appointment.therapist}</td>
            <td>
                <span class="status-badge status-${appointment.status}">
                    ${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
            </td>
            <td>${actionButtons}</td>
        `;
        
        appointmentsTableBody.appendChild(row);
    }
    
    // Add event listeners to action buttons
    addActionButtonListeners();
}

// Function to update pagination
function updatePagination() {
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const paginationNumbers = document.getElementById('paginationNumbers');
    
    if (!prevPageBtn || !nextPageBtn || !paginationNumbers) return;
    
    // Calculate total pages
    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
    
    // Enable/disable prev/next buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Update pagination numbers
    paginationNumbers.innerHTML = '';
    
    // Determine range of page numbers to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', function() {
            currentPage = i;
            displayAppointments();
            updatePagination();
        });
        paginationNumbers.appendChild(pageBtn);
    }
}

// Function to add event listeners to action buttons
function addActionButtonListeners() {
    // Approve buttons
    const approveButtons = document.querySelectorAll('.approve-btn');
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appointmentId = parseInt(this.getAttribute('data-id'));
            approveAppointment(appointmentId);
        });
    });
    
    // Refuse buttons
    const refuseButtons = document.querySelectorAll('.refuse-btn');
    refuseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appointmentId = parseInt(this.getAttribute('data-id'));
            showRefusalModal(appointmentId);
        });
    });
    
    // Edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appointmentId = parseInt(this.getAttribute('data-id'));
            editAppointment(appointmentId);
        });
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appointmentId = parseInt(this.getAttribute('data-id'));
            deleteAppointment(appointmentId);
        });
    });
    
    // View buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appointmentId = parseInt(this.getAttribute('data-id'));
            viewAppointment(appointmentId);
        });
    });
}

// Function to approve an appointment
function approveAppointment(appointmentId) {
    // Find the appointment
    const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
    
    if (appointmentIndex !== -1) {
        // Update status
        appointments[appointmentIndex].status = 'confirmed';
        
        // Save to localStorage
        saveAppointments();
        
        // Send confirmation email
        sendConfirmationEmail(appointments[appointmentIndex]);
        
        // Reload appointments
        loadAppointments();
        updatePendingCount();
        
        // Show success message
        alert('Appointment approved successfully!');
    }
}

// Function to show refusal modal
function showRefusalModal(appointmentId) {
    const refusalModal = document.getElementById('refusalModal');
    const refusalPatientName = document.getElementById('refusalPatientName');
    
    // Find the appointment
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (appointment && refusalModal && refusalPatientName) {
        // Set patient name in modal
        refusalPatientName.textContent = appointment.patientName;
        
        // Store appointment ID for use when confirming
        currentAppointmentId = appointmentId;
        
        // Show modal
        refusalModal.style.display = 'block';
    }
}

// Function to refuse an appointment
function refuseAppointment(appointmentId, reason) {
    // Find the appointment
    const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
    
    if (appointmentIndex !== -1) {
        // Update status and add reason
        appointments[appointmentIndex].status = 'cancelled';
        appointments[appointmentIndex].refusalReason = reason;
        
        // Save to localStorage
        saveAppointments();
        
        // Send refusal email
        sendRefusalEmail(appointments[appointmentIndex], reason);
        
        // Reload appointments
        loadAppointments();
        updatePendingCount();
        
        // Show success message
        alert('Appointment refused successfully.');
    }
}

// Function to edit an appointment
function editAppointment(appointmentId) {
    // This would open a modal with the appointment details for editing
    alert('Edit functionality would be implemented here.');
}

// Function to delete an appointment
function deleteAppointment(appointmentId) {
    if (confirm('Are you sure you want to delete this appointment?')) {
        // Remove the appointment
        appointments = appointments.filter(a => a.id !== appointmentId);
        
        // Save to localStorage
        saveAppointments();
        
        // Reload appointments
        loadAppointments();
        updatePendingCount();
        
        // Show success message
        alert('Appointment deleted successfully.');
    }
}

// Function to view appointment details
function viewAppointment(appointmentId) {
    // This would open a modal with the appointment details
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (appointment) {
        alert(`
            Patient: ${appointment.patientName}
            Date: ${appointment.date}
            Time: ${appointment.time}
            Service: ${appointment.service}
            Therapist: ${appointment.therapist}
            Status: ${appointment.status}
        `);
    }
}

// Function to filter appointments
function filterAppointments(filter) {
    if (filter === 'all') {
        filteredAppointments = [...appointments];
    } else {
        filteredAppointments = appointments.filter(appointment => appointment.status === filter);
    }
    
    // Reset to first page
    currentPage = 1;
    
    // Display filtered appointments
    displayAppointments();
    updatePagination();
}

// Function to search appointments
function searchAppointments(searchTerm) {
    if (!searchTerm) {
        // If search term is empty, reset to current filter
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            filterAppointments(activeFilter.getAttribute('data-filter'));
        } else {
            filteredAppointments = [...appointments];
        }
    } else {
        // Search in all appointments
        searchTerm = searchTerm.toLowerCase();
        
        filteredAppointments = appointments.filter(appointment => {
            return (
                appointment.patientName.toLowerCase().includes(searchTerm) ||
                appointment.service.toLowerCase().includes(searchTerm) ||
                appointment.therapist.toLowerCase().includes(searchTerm) ||
                appointment.date.includes(searchTerm) ||
                appointment.time.includes(searchTerm) ||
                appointment.status.toLowerCase().includes(searchTerm)
            );
        });
    }
    
    // Reset to first page
    currentPage = 1;
    
    // Display search results
    displayAppointments();
    updatePagination();
}

// Function to update pending count
function updatePendingCount() {
    const pendingAlert = document.getElementById('pendingAlert');
    const pendingCount = document.getElementById('pendingCount');
    
    if (pendingAlert && pendingCount) {
        const count = appointments.filter(a => a.status === 'pending').length;
        
        pendingCount.textContent = count;
        
        if (count > 0) {
            pendingAlert.style.display = 'flex';
        } else {
            pendingAlert.style.display = 'none';
        }
    }
}

// Function to send confirmation email
function sendConfirmationEmail(appointment) {
    // Check if EmailJS is available
    if (typeof emailjs !== 'undefined') {
        const templateParams = {
            to_name: appointment.patientName,
            to_email: appointment.email,
            appointment_date: new Date(appointment.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            appointment_time: appointment.time,
            service: appointment.service,
            therapist: appointment.therapist
        };
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'appointment_confirmation', templateParams)
            .then(function(response) {
                console.log('Confirmation email sent successfully!', response);
            })
            .catch(function(error) {
                console.error('Failed to send confirmation email:', error);
            });
    } else {
        console.log('EmailJS not available. Would send confirmation email to:', appointment.email);
    }
}

// Function to send refusal email
function sendRefusalEmail(appointment, reason) {
    // Check if EmailJS is available
    if (typeof emailjs !== 'undefined') {
        const templateParams = {
            to_name: appointment.patientName,
            to_email: appointment.email,
            appointment_date: new Date(appointment.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            appointment_time: appointment.time,
            service: appointment.service,
            refusal_reason: reason
        };
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'appointment_refusal', templateParams)
            .then(function(response) {
                console.log('Refusal email sent successfully!', response);
            })
            .catch(function(error) {
                console.error('Failed to send refusal email:', error);
            });
    } else {
        console.log('EmailJS not available. Would send refusal email to:', appointment.email);
    }
}
