package com.example.chatapplication.User_Profile;

import android.app.Dialog;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.Button;

import androidx.fragment.app.Fragment;

import com.bumptech.glide.Glide;
import com.example.chatapplication.R;
import com.example.chatapplication.Services.RetrofitClient;
import com.example.chatapplication.Services.UserInfoService;


import de.hdodenhof.circleimageview.CircleImageView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserProfileFragment extends Fragment {
    private TextView preferredName;
    private TextView phoneNumber;
    private TextView gender;
    private ImageView backgroundImage;
    private CircleImageView profileImage;
    private TextView userName;
    private TextView userEmail;
    private TextView dob;
    private Button updateButton;
    private UserProfile userProfile;
    public UserProfileFragment(){

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){
        View view = inflater.inflate(R.layout.user_profile_layout, container, false);

        backgroundImage = view.findViewById(R.id.background_image);

        phoneNumber = view.findViewById(R.id.phone_number);

        gender = view.findViewById(R.id.gender);

        preferredName = view.findViewById(R.id.preferred_name);

        profileImage = view.findViewById(R.id.profile_image);

        userName = view.findViewById(R.id.user_name);

        userEmail = view.findViewById(R.id.user_email);

        dob = view.findViewById(R.id.dob);

        updateButton = view.findViewById(R.id.update_button); // Add this line to find the button
        updateButton.setOnClickListener(v -> showEditDialog());

        loadUserInfo();

        return view;
    }

    private void loadUserInfo() {
        UserInfoService apiService = RetrofitClient.getRetrofitInstance(getContext()).create(UserInfoService.class);

        Call<UserProfile> call = apiService.getUserInfo();

        call.enqueue(new Callback<>() {
            @Override
            public void onResponse(Call<UserProfile> call, Response<UserProfile> response) {
                if (response.isSuccessful() && response.body() != null){
                    userProfile = response.body();
                    updateUI(userProfile);
                } else {
                    Log.e("API Error", "Response Code: " + response.code() + ", Message: " + response.message());
                    Toast.makeText(getActivity(), "Failed to fetch user info", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<UserProfile> call, Throwable t) {
                Toast.makeText(getActivity(), "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void updateUI(UserProfile userProfile){
        Glide.with(this).load(userProfile.getBackground_url() != null ? userProfile.getAvatar_url() : R.drawable.default_avatar) // Use a default image if null
                .into(backgroundImage);
        Glide.with(this).load(userProfile.getAvatar_url() != null ? userProfile.getAvatar_url() : R.drawable.default_avatar) // Use a default image if null
                .into(profileImage);
        preferredName.setText(userProfile.getPreferred_username());
        phoneNumber.setText(userProfile.getPhone_number());
        gender.setText(userProfile.getGender());
        userName.setText(userProfile.getName());
        userEmail.setText(userProfile.getEmail());
        dob.setText(userProfile.getDob());
    }

    private void showEditDialog() {
        Dialog dialog = new Dialog(getContext());
        dialog.setContentView(R.layout.diaglog_user_profile_update);

        EditText editPreferredName = dialog.findViewById(R.id.edit_preferred_name);
        EditText editPhoneNumber = dialog.findViewById(R.id.edit_phone_number);
        EditText editGender = dialog.findViewById(R.id.edit_gender);
        EditText editUserName = dialog.findViewById(R.id.edit_user_name);
        EditText editUserEmail = dialog.findViewById(R.id.edit_user_email);
        EditText editDob = dialog.findViewById(R.id.edit_dob);
        Button saveButton = dialog.findViewById(R.id.button_save);
        Button cancelButton = dialog.findViewById(R.id.button_cancel);
        editPreferredName.setText(preferredName.getText());
        editPhoneNumber.setText(phoneNumber.getText());
        editGender.setText(gender.getText());
        editUserName.setText(userName.getText());
        editUserEmail.setText(userEmail.getText());
        editDob.setText(dob.getText());

        saveButton.setOnClickListener(v -> {
            saveUserInfo(editPreferredName.getText().toString(), editPhoneNumber.getText().toString(),
                    editGender.getText().toString(), editUserName.getText().toString(),
                    editUserEmail.getText().toString(), editDob.getText().toString());
            dialog.dismiss(); // Dismiss dialog after saving
        });

        cancelButton.setOnClickListener(v -> {
            dialog.dismiss();
        });
        dialog.show();
    }
    private void saveUserInfo(String updatedPreferredName, String updatedPhoneNumber,
                              String updatedGender, String updatedUserName,
                              String updatedUserEmail, String updatedDob) {
        UserInfoService apiService = RetrofitClient.getRetrofitInstance(getContext()).create(UserInfoService.class);

        Call<UserProfile> updateCall = apiService.updateUserInfo(
                updatedPreferredName,
                updatedUserName,
                updatedPhoneNumber,
                updatedUserEmail,
                updatedGender,
                userProfile.getAvatar_url(),
                userProfile.getBackground_url(),
                updatedDob
        );

        // Enqueue the request
        updateCall.enqueue(new Callback<>() {
            @Override
            public void onResponse(Call<UserProfile> call, Response<UserProfile> response) {
                if (response.isSuccessful() && response.body() != null) {
                    userProfile = response.body();
                    Log.e("Response", "Response Body: " + userProfile);
                    updateUI(userProfile);  // Update UI with updated profile info
                    Toast.makeText(getActivity(), "User info updated successfully", Toast.LENGTH_SHORT).show();
                } else {
                    Log.e("API Error", "Response Code: " + response.code() + ", Message: " + response.message());
                    Toast.makeText(getActivity(), "Failed to update user info", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<UserProfile> call, Throwable t) {
                Toast.makeText(getActivity(), "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}
