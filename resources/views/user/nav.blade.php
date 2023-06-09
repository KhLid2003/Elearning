<nav
            class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0"
        >
            <a
                href="/"
                class="navbar-brand d-flex align-items-center px-4 px-lg-5"
            >
                <h2 class="m-0 text-primary">
                    <i class="fa fa-book me-3"></i>eLEARNING
                </h2>
            </a>
            <button
                type="button"
                class="navbar-toggler me-4"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav ms-auto p-4 p-lg-0">
                    <a href="/" class="nav-item nav-link"
                        >Home</a
                    >
                    <a href="{{url('about')}}" class="nav-item nav-link">About</a>
                    <a href="{{url('courses')}}" class="nav-item nav-link">Courses</a>
                    <div class="nav-item dropdown">
                        <a
                            href="#"
                            class="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                            >Formation</a
                        >
                        <div class="dropdown-menu fade-down m-0">
                            <a href="{{url('/francais')}}" class="dropdown-item"
                                >Francais</a>
                            <a href="{{url('anglais')}}" class="dropdown-item"
                                >Anglais</a>
                            <a href="{{url('allemand')}}" class="dropdown-item"
                                >Allemand</a>
                        </div>
                    </div>
                    <a href="{{url('contact')}}" class="nav-item nav-link">Contact</a>
                    <a href="{{url('login')}}" class="nav-item nav-link">Login</a>
                    
                    @if (Route::has('login'))
                    <div>
                        @auth
                                <x-app-layout>
    
                                </x-app-layout>
                            
                    @else
                            <a
                            href="{{url('register')}}"
                            class="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
                            >Register<i class="fa fa-arrow-right ms-3"></i></a>                            @endif
                        </div>
                     @endif


                </div>
            </div>
        </nav>