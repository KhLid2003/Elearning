<!DOCTYPE html>
<html lang="en">
   
@include('admin.head')

    <body>

        @include('admin.sidebar')
        
        <div class="container-fluid position-relative d-flex p-0">
            <!-- Spinner Start -->
            <div
                id="spinner"
                class="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            >
                <div
                    class="spinner-border text-primary"
                    style="width: 3rem; height: 3rem"
                    role="status"
                >
                    <span class="sr-only">Loading...</span>
                </div>
            </div>

            <div class="content">
        
                @include('admin.nav')

                <div class="container-fluid pt-4 px-4">
                    <div class="bg-secondary text-center rounded p-4">
                        <div
                            class="d-flex align-items-center justify-content-between mb-4"
                        >
                            <h6 class="mb-0">Messages</h6>
                        </div>
                        <div class="table-responsive">
                            <table
                                class="table text-start align-middle table-bordered table-hover mb-0"
                            >
                                <thead>
                                    <tr class="text-white">
                                        <th scope="col">name</th>
                                        <th scope="col">adrress</th>
                                        <th scope="col">email</th>
                                        <th scope="col">phone</th>
                                        <th scope="col">date ins</th>
                                        <th scope="col">actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($clients as $client)    
                                        <tr>
                                            <td>{{$client['name']}}</td>
                                            <td>{{$client['address']}}</td>
                                            <td>{{$client['email']}}</td>
                                            <td>{{$client['phone']}}</td>
                                            <td>{{$client['created_at']}}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <!-- JavaScript Libraries -->

        @include('admin.scripts')

    </body>
</html>

