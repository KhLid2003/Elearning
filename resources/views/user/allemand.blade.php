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
                    <h1 class="display-3 text-white animated slideInDown">Allemand</h1>
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
                    <h1 class="mb-4">Apprendre l'allemand en ligne, de manière efficace et amusante</h1>
                    <h4 class="mb-4">
                        Notre formation à distance en allemand vous permet d'apprendre la langue de manière interactive, en utilisant des méthodes d'apprentissage modernes et amusantes.                    </h4>
                    <p class="mb-4">
                        Vous voulez apprendre l'allemand pour vos études ou pour votre carrière, mais vous ne pouvez pas suivre des cours en présentiel ? Notre formation à distance en allemand est faite pour vous.
Notre programme de formation en ligne vous offre une expérience d'apprentissage interactive et amusante. Vous aurez accès à des cours enregistrés par des professeurs qualifiés et des exercices interactifs pour renforcer vos connaissances. Vous pourrez également participer à des discussions en groupe en direct et des jeux de rôle pour améliorer votre expression orale.
Notre formation couvre tous les aspects de la langue allemande, y compris la compréhension orale et écrite, l'expression orale et écrite, le vocabulaire, la grammaire et la prononciation. Nous proposons également des options de cours spécifiques, comme la préparation aux examens d'allemand (TestDaF, Goethe-Zertifikat, etc.) ou des cours d'allemand pour les affaires.
En choisissant notre formation à distance en allemand, vous aurez accès à des outils de suivi pour surveiller vos progrès, ainsi qu'à un soutien continu de la part de nos professeurs. Nous utilisons des méthodes d'apprentissage modernes et amusantes pour vous aider à apprendre l'allemand de manière efficace et agréable. Vous pourrez également accéder à des ressources supplémentaires, comme des livres électroniques et des vidéos, pour continuer à apprendre même lorsque vous ne suivez pas de cours.
En choisissant notre formation à distance en allemand, vous pourrez apprendre la langue de manière interactive et amusante, en utilisant des méthodes d'apprentissage modernes et en bénéficiant d'un soutien continu de la part de nos professeurs qualifiés. Nous sommes convaincus que vous réussirez à atteindre vos objectifs d'apprentissage de la langue allemande grâce à notre programme en ligne.
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