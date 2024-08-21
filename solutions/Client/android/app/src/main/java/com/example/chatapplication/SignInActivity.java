package com.example.chatapplication;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class SignInActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_sign_in);

        Button signInButton;

        System.out.println(BuildConfig.XINCHAO);
        System.out.println(BuildConfig.HELLO);
        signInButton = findViewById(R.id.signInBtn);

        signInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText usNameET = findViewById(R.id.usernameTxt);
                EditText passwordET = findViewById(R.id.passwordTxt);
                if(usNameET.getText().toString().equals("username") && passwordET.getText().toString().equals("pass123")){
                    startActivity(new Intent(SignInActivity.this, MainActivity.class));
                }
                else{
                    Toast.makeText(SignInActivity.this, "Wrong username or password", Toast.LENGTH_SHORT).show();
                }

            }
        });

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}