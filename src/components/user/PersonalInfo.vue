<template>
  <div class="col-md-9">
    <div class="card profile-card">
      <div class="card-body">
        <h5 class="card-title" style="color: darkgray">Edit Profile</h5>
        <form>
          <div class="mb-3 text-center d-flex p-3">
            <p class="mt-3">Photo</p>
            <div class="d-flex m-auto float-end">
              <i class="fa-solid fa-user m-auto me-3"></i>
              <button type="button" class="btn btn-secondary m-auto me-5">
                Choose
              </button>
              <small class="text-muted m-auto me-5"
                >JPG, JPEG or PNG, 1 MB max.</small
              >
              <i class="fa-solid fa-trash m-auto ms-5"></i>
            </div>
          </div>
          <div class="mb-3">
            <label for="fullName" class="form-label">Full name</label>
            <input
              type="text"
              class="form-control"
              id="fullName"
              value="Jack Daniel"
            />
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              value="jackdaniel"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              value="jack@email.com"
            />
          </div>
          <button type="submit" class="btn btnProfileMenu float-end mt-2">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
