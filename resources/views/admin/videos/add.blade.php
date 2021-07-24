<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ADD VIDEOS</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <form method="POST" accept="">
                    @csrf
                    <div class="form-group">
                      <label for="exampleFormControlInput1">Name</label>
                      <input type="text" class="form-control" id="exampleFormControlInput1" name="name" placeholder="name">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Avata</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" name="avata" placeholder="Avata">
                      </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Time</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" name="time" placeholder="time">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">File Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" name="file_name" placeholder="File Name">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Favourite</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" name="favourite" placeholder="Favourite">
                    </div>
                    
                    <div class="form-group">
                      <label for="exampleFormControlSelect1">Category</label>
                      <select class="form-control" id="exampleFormControlSelect1" name="category_id">
                        @foreach($categories as $item)
                        <option value="{{ $item->id }}">{{ $item->name }}</option>
                        @endforeach
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Description</label>
                      <textarea class="form-control" id="exampleFormControlTextarea1" name="description" rows="3"></textarea>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-group btn-primary col-lg-12 ">SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</html>