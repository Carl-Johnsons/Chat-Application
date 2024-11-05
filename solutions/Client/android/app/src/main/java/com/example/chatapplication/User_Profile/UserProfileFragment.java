package com.example.chatapplication.User_Profile;

import android.app.Dialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Button;

import androidx.fragment.app.Fragment;

import com.bumptech.glide.Glide;
import com.example.chatapplication.DTOs.CurrentUserResponseDTO;
import com.example.chatapplication.DTOs.UpdateUserDTO;
import com.example.chatapplication.R;
import com.example.chatapplication.Services.RetrofitClient;
import com.example.chatapplication.Services.UserService;
import com.example.chatapplication.utils.ApiUtil;
import com.google.gson.Gson;


import java.util.HashMap;
import java.util.Map;

import de.hdodenhof.circleimageview.CircleImageView;
import okhttp3.MediaType;
import okhttp3.RequestBody;

public class UserProfileFragment extends Fragment {
    private TextView preferredName;
    private TextView phoneNumber;
    private TextView gender;
    private ImageView backgroundImage;
    private CircleImageView profileImage;
    private Button updateButton;

    private CurrentUserResponseDTO CurrentUser;

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

        updateButton = view.findViewById(R.id.update_button);
        updateButton.setOnClickListener(v -> showEditDialog());

        loadUserInfo();

        return view;
    }

    private void loadUserInfo() {
        SharedPreferences sharedPreferences = requireContext().getSharedPreferences("CurrentUser", Context.MODE_PRIVATE);
        String userJson = sharedPreferences.getString("CurrentUser", null);
        if (userJson != null) {
            Gson gson = new Gson();
            CurrentUser = gson.fromJson(userJson, CurrentUserResponseDTO.class);
            updateUI(CurrentUser);
        }
    }

    private void updateUI(CurrentUserResponseDTO userProfile){
        Glide.with(this).load(userProfile.getBackgroundUrl() != null ? userProfile.getBackgroundUrl() : R.drawable.default_avatar)
                .into(backgroundImage);
        Glide.with(this).load(userProfile.getAvartarUrl() != null ? userProfile.getAvartarUrl() : R.drawable.default_avatar)
                .into(profileImage);
        preferredName.setText(userProfile.getName());
        phoneNumber.setText(userProfile.getPhoneNumber());
        gender.setText(userProfile.getGender());
    }

    private void showEditDialog() {
        Dialog dialog = new Dialog(getContext());
        dialog.setContentView(R.layout.diaglog_user_profile_update);

        EditText editPreferredName = dialog.findViewById(R.id.edit_preferred_name);
        EditText editPhoneNumber = dialog.findViewById(R.id.edit_phone_number);
        Button saveButton = dialog.findViewById(R.id.button_save);
        Button cancelButton = dialog.findViewById(R.id.button_cancel);
        editPreferredName.setText(preferredName.getText());
        editPhoneNumber.setText(phoneNumber.getText());

//        RadioGroup radioGroupGender = dialog.findViewById(R.id.radioGroupGender);
//        int selectedId = radioGroupGender.getCheckedRadioButtonId();
//        RadioButton selectedRadioButton = dialog.findViewById(selectedId);
//        String gender = selectedRadioButton.getText().toString();




        saveButton.setOnClickListener(v -> {
            var userService  = RetrofitClient.getRetrofitInstance(getContext()).create(UserService.class);
            var dto = new UpdateUserDTO();
            dto.setName(editPreferredName.getText().toString());
//            dto.setGender(editGender.getText().toString());
            var dtoMap = convertDtoToRequestBodyMap(dto);

            ApiUtil.callApi(userService.updateCurrentUser(dtoMap), new ApiUtil.StatusCallback() {
                @Override
                public void onSuccess() {
                    System.out.println("Update success");
                    dialog.dismiss();
                    loadUser();
                }

                @Override
                public void onError(Throwable t) {
                    System.out.println("Update failed " + t.getMessage());
                }
            });

        });

        cancelButton.setOnClickListener(v -> {
            dialog.dismiss();
        });
        dialog.show();
    }

    private Map<String, RequestBody> convertDtoToRequestBodyMap(UpdateUserDTO dto) {
        Map<String, RequestBody> map = new HashMap<>();
        map.put("name", RequestBody.create(MediaType.parse("multipart/form-data"), dto.getName()));
//        map.put("email", RequestBody.create(MediaType.parse("multipart/form-data"), dto.getGender()));
        return map;
    }

    private void loadUser(){
        UserService userService = RetrofitClient.getRetrofitInstance(getContext()).create(UserService.class);
        ApiUtil.callApi(userService.getCurrentUser(), new ApiUtil.ApiCallback<>() {
            @Override
            public void onSuccess(CurrentUserResponseDTO response) {
                var currentUser = new CurrentUserResponseDTO();
                currentUser.setSub(response.getSub());
                currentUser.setGender(response.getGender());
                currentUser.setName(response.getName());
                currentUser.setEmail(response.getEmail());
                currentUser.setPreferredUsername(response.getPreferredUsername());
                currentUser.setAvartarUrl(response.getAvartarUrl());
                currentUser.setBackgroundUrl(response.getBackgroundUrl());
                currentUser.setPhoneNumber(response.getPhoneNumber());

                Gson gson = new Gson();
                String userJson = gson.toJson(currentUser);
                SharedPreferences prefs = requireContext().getSharedPreferences("CurrentUser", Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = prefs.edit();
                editor.putString("CurrentUser", userJson);
                editor.apply();
                System.out.println("load current user success");
                loadUserInfo();
            }

            @Override
            public void onError(Throwable t) {
                System.out.println("load current user success");
            }
        });
    }


}
