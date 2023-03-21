<!DOCTYPE html>
<html lang="en">

<head>
    @include('user.head')
</head>

<body>
    <!-- Spinner Start -->
    <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <!-- Spinner End -->


    <!-- Navbar Start -->
    @include('user.nav')
    <!-- Navbar End -->


    <!-- Header Start -->
    <div class="container-fluid bg-primary py-5 mb-5 page-header">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-10 text-center">
                    <h1 class="display-3 text-white animated slideInDown">francais</h1>
                </div>
            </div>
        </div>
    </div>
    <!-- Header End -->

    <!-- About Start -->
    <div class="container-xxl py-5">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style="min-height: 400px;">
                    <div class="position-relative h-100">
                        <img class="img-fluid position-absolute w-100 h-100" src="template/img/about.jpg" alt="" style="object-fit: cover;">
                    </div>
                </div>
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                    <h1 class="mb-4">Apprendre le français en ligne, où que vous soyez</h1>
                    <h4 class="mb-4">
                        Notre formation à distance en français vous permet d'apprendre à votre rythme, où que vous soyez dans le monde.
                    </h4>
                    <p class="mb-4">
                        Vous souhaitez apprendre le français, mais vous êtes trop occupé pour suivre des cours en présentiel ? Ou peut-être vivez-vous à l'étranger et ne pouvez pas accéder à des cours locaux ? Quel que soit votre situation, notre formation à distance en français est faite pour vous.
                        Notre programme de formation en ligne vous permet d'apprendre à votre rythme, où que vous soyez dans le monde. Vous aurez accès à des cours en ligne enregistrés par des professeurs qualifiés, ainsi qu'à des exercices interactifs pour renforcer vos connaissances. Vous pourrez également participer à des discussions en groupe et à des séances de pratique orale en direct avec d'autres étudiants.
                        Notre formation couvre tous les aspects de la langue française, y compris la compréhension orale et écrite, l'expression orale et écrite, le vocabulaire, la grammaire et la prononciation. Nous proposons également des options de cours spécifiques, comme la préparation aux examens de français (DELF, DALF, etc.) ou des cours de français pour les affaires.
                        En choisissant notre formation à distance en français, vous aurez accès à des outils de suivi pour surveiller vos progrès, ainsi qu'à un soutien continu de la part de nos professeurs. Nous sommes convaincus que vous réussirez à atteindre vos objectifs d'apprentissage de la langue française grâce à notre programme en ligne.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- About End -->


        

    <!-- Footer Start -->
    @include('user.foot')
    <!-- Footer End -->


    <!-- Back to Top -->
    <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>


    <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="template/lib/wow/wow.min.js"></script>
    <script src="template/lib/easing/easing.min.js"></script>
    <script src="template/lib/waypoints/waypoints.min.js"></script>
    <script src="template/lib/owlcarousel/owl.carousel.min.js"></script>

    <!-- Template Javascript -->
    <script src="template/js/main.js"></script>
</body>

</html>