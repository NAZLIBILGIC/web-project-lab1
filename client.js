displayView = function(){
    // the code required to display a view
};
window.onload = function(){
    //code that is executed as the page is loaded.
    //You shall put your own custom code here.
    //window.alert() is not allowed to be used in your implementation.
    //window.alert("Hello TDDD97!");
    function validatePasswordsMatch() {
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;
        return password === confirmPassword;
    }
    function validatePasswordLength(minLength) {
        var password = document.getElementById('password').value;
        return password.length >= minLength;
    }
    function validateForm() {
        // Check if passwords match (for signup form)
        if (!validatePasswordsMatch()) {
            document.getElementById('password-error').innerText = 'Passwords do not match';
            return false;
        }
    
        // Check password length (can be omitted if using HTML minlength)
        if (!validatePasswordLength(8)) {
            document.getElementById('password-length-error').innerText = 'Password must be at least 8 characters';
            return false;
        }
    
        return true; // allow form submission
    }
    
    };
