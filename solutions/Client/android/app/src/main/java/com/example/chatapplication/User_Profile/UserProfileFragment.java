package com.example.chatapplication.User_Profile;

import static android.app.Activity.RESULT_OK;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
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

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import android.Manifest;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.chatapplication.DTOs.CurrentUserResponseDTO;
import com.example.chatapplication.DTOs.UpdateUserDTO;
import com.example.chatapplication.R;
import com.example.chatapplication.Services.RetrofitClient;
import com.example.chatapplication.Services.UserService;
import com.example.chatapplication.utils.ApiUtil;
import com.example.chatapplication.utils.FileUtil;
import com.google.gson.Gson;


import java.util.HashMap;
import java.util.Map;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;

public class UserProfileFragment extends Fragment {
    private static final int PICK_IMAGE = 1;
    private static final int MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE = 2;
    private boolean hasReadExternalFilePermitsion = false;

    private TextView preferredName;
    private TextView phoneNumber;
    private TextView gender;
    private ImageView backgroundImage;
    private ImageView profileImage;
    private Button updateButton;
    private  ImageView profileImageEdit;

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

        profileImageEdit = view.findViewById(R.id.profile_image_edit);
        profileImageEdit.setOnClickListener(v -> openImageChooser());

        checkReadExternalFile();

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
        Glide.with(this).load(userProfile.getAvartarUrl() != null ? userProfile.getAvartarUrl() : R.drawable.default_avatar).circleCrop()
                .into(profileImage);

        preferredName.setText(userProfile.getName());
        phoneNumber.setText(userProfile.getPhoneNumber());
        gender.setText(userProfile.getGender());
    }

    private void showEditDialog() {
        Dialog dialog = new Dialog(getContext());
        dialog.setContentView(R.layout.diaglog_user_profile_update);

        EditText editPreferredName = dialog.findViewById(R.id.edit_preferred_name);
        Button saveButton = dialog.findViewById(R.id.button_save);
        Button cancelButton = dialog.findViewById(R.id.button_cancel);
        editPreferredName.setText(preferredName.getText());

        RadioGroup radioGroupGender = dialog.findViewById(R.id.radioGroupGender);
        RadioButton rdoMale = dialog.findViewById(R.id.radioMale);
        RadioButton rdoFemale = dialog.findViewById(R.id.radioFemale);

        if(CurrentUser.gender.equals("Nam")){
            rdoMale.setChecked(true);
        }else{
            rdoFemale.setChecked(true);
        }



        saveButton.setOnClickListener(v -> {
            int selectedId = radioGroupGender.getCheckedRadioButtonId();
            RadioButton selectedRadioButton = dialog.findViewById(selectedId);
            String gender = selectedRadioButton.getText().toString();

            var userService  = RetrofitClient.getRetrofitInstance(getContext()).create(UserService.class);
            var dto = new UpdateUserDTO();
            dto.setName(editPreferredName.getText().toString());
            dto.setGender(gender);
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
        if(dto.getName() != null){
            map.put("name", RequestBody.create(MediaType.parse("multipart/form-data"), dto.getName()));
        }
        if(dto.getGender() != null){
            map.put("gender", RequestBody.create(MediaType.parse("multipart/form-data"), dto.getGender()));
        }
        if(dto.getIntroduction() != null){
            map.put("introduction", RequestBody.create(MediaType.parse("multipart/form-data"), dto.getIntroduction()));
        }
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

    private void openImageChooser() {
        if (!hasReadExternalFilePermitsion) {
            checkReadExternalFile();
            return;
        }
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType("image/*");
        startActivityForResult(intent, PICK_IMAGE);
    }

    private void checkReadExternalFile(){
        if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE);
        } else {
            hasReadExternalFilePermitsion = true;
        }
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                hasReadExternalFilePermitsion = true;
            } else {
                hasReadExternalFilePermitsion = false;
                Toast.makeText(getActivity(), "Permission denied to read your External storage", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE && resultCode == RESULT_OK && data != null) {
            Uri imageUri = data.getData();
            if (imageUri != null) {
                Glide.with(this).load(imageUri).circleCrop().into(profileImage);
                var userService = RetrofitClient.getRetrofitInstance(getContext()).create(UserService.class);
                var dto = new UpdateUserDTO();
                dto.setAvatarImage(FileUtil.uriToFile(imageUri, getContext()));
                if(dto.getAvatarImage() == null){
                    return;
                }
                MultipartBody.Part filePart = MultipartBody.Part.createFormData("avatarFile", dto.getAvatarImage().getName(), RequestBody.create(MediaType.parse("image/*"), dto.getAvatarImage()));
                ApiUtil.callApi(userService.updateUserAvatar(filePart), new ApiUtil.StatusCallback() {
                    @Override
                    public void onSuccess() {
                        System.out.println("Update avatar thanh cong");
                        loadUser();
                    }

                    @Override
                    public void onError(Throwable t) {
                        System.out.println("Update failed " + t.getMessage());
                    }
                });
            } else {
                Toast.makeText(getActivity(), "Không thể lấy URI từ hình ảnh", Toast.LENGTH_SHORT).show();
            }
        }
    }

}
