/* =========================================================
   STYLEHUB - AUTHENTICATION
   Firebase Email & Password Authentication
   ========================================================= */


/* =========================================================
   REGISTER USER
   ========================================================= */

async function registerUser(email, password, name) {

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        /* Update display name */

        await updateProfile(
            user,
            {
                displayName: name
            }
        );


        /* Save user information locally */

        localStorage.setItem(
            "stylehubUser",
            JSON.stringify({

                uid: user.uid,

                name: name,

                email: user.email

            })
        );


        showAuthMessage(
            "Account created successfully!",
            "success"
        );


        /* Redirect */

        setTimeout(
            function () {

                window.location.href =
                    "account.html";

            },
            1000
        );


    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );


        showAuthMessage(
            getAuthErrorMessage(
                error.code
            ),
            "error"
        );

    }

}



/* =========================================================
   LOGIN USER
   ========================================================= */

async function loginUser(email, password) {

    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        /* Save login information */

        localStorage.setItem(
            "stylehubUser",
            JSON.stringify({

                uid: user.uid,

                name:
                    user.displayName ||
                    "StyleHub User",

                email: user.email

            })
        );


        showAuthMessage(
            "Login successful!",
            "success"
        );


        /* Redirect */

        setTimeout(
            function () {

                window.location.href =
                    "account.html";

            },
            1000
        );


    } catch (error) {

        console.error(
            "Login Error:",
            error
        );


        showAuthMessage(
            getAuthErrorMessage(
                error.code
            ),
            "error"
        );

    }

}



/* =========================================================
   LOGOUT USER
   ========================================================= */

async function logoutUser() {

    try {

        await signOut(auth);


        localStorage.removeItem(
            "stylehubUser"
        );


        showAuthMessage(
            "Logged out successfully.",
            "success"
        );


        setTimeout(
            function () {

                window.location.href =
                    "index.html";

            },
            800
        );


    } catch (error) {

        console.error(
            "Logout Error:",
            error
        );


        showAuthMessage(
            "Unable to logout. Please try again.",
            "error"
        );

    }

}



/* =========================================================
   CHECK LOGIN STATUS
   ========================================================= */

function checkAuthState() {

    onAuthStateChanged(
        auth,
        function (user) {

            if (user) {

                console.log(
                    "Logged in:",
                    user.email
                );


                updateUserInterface(
                    user
                );

            } else {

                console.log(
                    "No user logged in."
                );


                updateUserInterface(
                    null
                );

            }

        }
    );

}



/* =========================================================
   UPDATE USER INTERFACE
   ========================================================= */

function updateUserInterface(user) {

    const loginLinks =
        document.querySelectorAll(
            ".login-link"
        );


    const logoutButtons =
        document.querySelectorAll(
            ".logout-btn"
        );


    const userNames =
        document.querySelectorAll(
            ".user-name"
        );


    if (user) {

        /* Hide login links */

        loginLinks.forEach(
            function (link) {

                link.style.display =
                    "none";

            }
        );


        /* Show logout buttons */

        logoutButtons.forEach(
            function (button) {

                button.style.display =
                    "inline-flex";

            }
        );


        /* Show user name */

        userNames.forEach(
            function (element) {

                element.textContent =
                    user.displayName ||
                    user.email;

            }
        );


    } else {

        /* Show login links */

        loginLinks.forEach(
            function (link) {

                link.style.display =
                    "";

            }
        );


        /* Hide logout buttons */

        logoutButtons.forEach(
            function (button) {

                button.style.display =
                    "none";

            }
        );

    }

}



/* =========================================================
   GET CURRENT USER
   ========================================================= */

function getCurrentUser() {

    return auth.currentUser;

}



/* =========================================================
   CHECK WHETHER USER IS LOGGED IN
   ========================================================= */

function isUserLoggedIn() {

    return auth.currentUser !== null;

}



/* =========================================================
   PROTECT PAGE
   ========================================================= */

function requireLogin() {

    onAuthStateChanged(
        auth,
        function (user) {

            if (!user) {

                window.location.href =
                    "login.html";

            }

        }
    );

}



/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

async function resetPassword(email) {

    try {

        await sendPasswordResetEmail(
            auth,
            email
        );


        showAuthMessage(
            "Password reset email sent. Please check your inbox.",
            "success"
        );


    } catch (error) {

        console.error(
            "Password Reset Error:",
            error
        );


        showAuthMessage(
            getAuthErrorMessage(
                error.code
            ),
            "error"
        );

    }

}



/* =========================================================
   AUTH ERROR MESSAGES
   ========================================================= */

function getAuthErrorMessage(
    errorCode
) {

    switch (errorCode) {

        case "auth/email-already-in-use":

            return "This email is already registered. Please login.";


        case "auth/invalid-email":

            return "Please enter a valid email address.";


        case "auth/weak-password":

            return "Password must be at least 6 characters.";


        case "auth/user-not-found":

            return "No account found with this email.";


        case "auth/wrong-password":

            return "Incorrect password. Please try again.";


        case "auth/invalid-credential":

            return "Invalid email or password.";


        case "auth/too-many-requests":

            return "Too many attempts. Please try again later.";


        case "auth/network-request-failed":

            return "Network error. Please check your internet connection.";


        case "auth/user-disabled":

            return "This account has been disabled.";


        default:

            return "Something went wrong. Please try again.";

    }

}



/* =========================================================
   AUTH MESSAGE
   ========================================================= */

function showAuthMessage(
    message,
    type = "error"
) {

    let messageElement =
        document.getElementById(
            "auth-message"
        );


    /* Create message element
       if it doesn't exist */

    if (!messageElement) {

        messageElement =
            document.createElement(
                "div"
            );


        messageElement.id =
            "auth-message";


        document.body.prepend(
            messageElement
        );

    }


    messageElement.textContent =
        message;


    messageElement.className =
        "auth-message " +
        type;


    messageElement.style.cssText = `

        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99999;

        padding: 13px 22px;

        background:
            ${type === "success"
                ? "#eaf8ef"
                : "#fff0f0"};

        color:
            ${type === "success"
                ? "#267a43"
                : "#c0392b"};

        border:
            1px solid
            ${type === "success"
                ? "#b9dfc5"
                : "#efc2c2"};

        font-family:
            Montserrat,
            sans-serif;

        font-size: 10px;

        font-weight: 600;

        box-shadow:
            0 8px 25px
            rgba(0,0,0,0.10);

    `;


    setTimeout(
        function () {

            if (messageElement) {

                messageElement.remove();

            }

        },
        3500
    );

}



/* =========================================================
   REGISTER FORM
   ========================================================= */

function initializeRegisterForm() {

    const form =
        document.getElementById(
            "register-form"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "register-name"
                    )
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById(
                        "register-email"
                    )
                    ?.value
                    .trim();


            const password =
                document
                    .getElementById(
                        "register-password"
                    )
                    ?.value;


            const confirmPassword =
                document
                    .getElementById(
                        "register-confirm-password"
                    )
                    ?.value;


            /* Validation */

            if (!name) {

                showAuthMessage(
                    "Please enter your name.",
                    "error"
                );

                return;

            }


            if (!email) {

                showAuthMessage(
                    "Please enter your email.",
                    "error"
                );

                return;

            }


            if (!password) {

                showAuthMessage(
                    "Please enter a password.",
                    "error"
                );

                return;

            }


            if (password.length < 6) {

                showAuthMessage(
                    "Password must be at least 6 characters.",
                    "error"
                );

                return;

            }


            if (
                confirmPassword !==
                password
            ) {

                showAuthMessage(
                    "Passwords do not match.",
                    "error"
                );

                return;

            }


            await registerUser(
                email,
                password,
                name
            );

        }
    );

}



/* =========================================================
   LOGIN FORM
   ========================================================= */

function initializeLoginForm() {

    const form =
        document.getElementById(
            "login-form"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "login-email"
                    )
                    ?.value
                    .trim();


            const password =
                document
                    .getElementById(
                        "login-password"
                    )
                    ?.value;


            if (!email) {

                showAuthMessage(
                    "Please enter your email.",
                    "error"
                );

                return;

            }


            if (!password) {

                showAuthMessage(
                    "Please enter your password.",
                    "error"
                );

                return;

            }


            await loginUser(
                email,
                password
            );

        }
    );

}



/* =========================================================
   FORGOT PASSWORD FORM
   ========================================================= */

function initializeForgotPassword() {

    const form =
        document.getElementById(
            "forgot-password-form"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "forgot-email"
                    )
                    ?.value
                    .trim();


            if (!email) {

                showAuthMessage(
                    "Please enter your email.",
                    "error"
                );

                return;

            }


            await resetPassword(
                email
            );

        }
    );

}



/* =========================================================
   LOGOUT BUTTONS
   ========================================================= */

function initializeLogoutButtons() {

    const buttons =
        document.querySelectorAll(
            ".logout-btn"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    logoutUser();

                }
            );

        }
    );

}



/* =========================================================
   INITIALIZE AUTH
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeRegisterForm();

        initializeLoginForm();

        initializeForgotPassword();

        initializeLogoutButtons();

        checkAuthState();

    }
);
