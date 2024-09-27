plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "com.example.chatapplication"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.chatapplication"
        minSdk = 29
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        manifestPlaceholders["appAuthRedirectScheme"] = "chat-application"
    }

    buildTypes {
        debug {
            buildConfigField(
                "String",
                "ANDROID_CLIENT_ID",
                "\"" + env.ANDROID_CLIENT_ID.value + "\""
            )
            buildConfigField("String", "API_GATEWAY_PORT", "\"" + env.API_GATEWAY_PORT.value + "\"")
            buildConfigField(
                "String",
                "IDENTITY_SERVICE_PORT",
                "\"" + env.IDENTITY_SERVICE_PORT.value + "\""
            )
            buildConfigField("String", "SIGNALR_PORT", "\"" + env.SIGNALR_PORT.value + "\"")
        }
        release {
            buildConfigField(
                "String",
                "ANDROID_CLIENT_ID",
                "\"" + env.ANDROID_CLIENT_ID.value + "\""
            )
            buildConfigField("String", "API_GATEWAY_PORT", "\"" + env.API_GATEWAY_PORT.value + "\"")
            buildConfigField(
                "String",
                "IDENTITY_SERVICE_PORT",
                "\"" + env.IDENTITY_SERVICE_PORT.value + "\""
            )
            buildConfigField("String", "SIGNALR_PORT", "\"" + env.SIGNALR_PORT.value + "\"")

            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    buildFeatures {
        viewBinding = true
        buildConfig = true
    }
}

dependencies {

    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.activity)
    implementation(libs.constraintlayout)
    implementation(libs.lifecycle.livedata.ktx)
    implementation(libs.lifecycle.viewmodel.ktx)
    implementation(libs.navigation.fragment)
    implementation(libs.navigation.ui)
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
    implementation(libs.appauth)
    implementation(libs.material.v1130alpha05)
    implementation(libs.retrofit)
    implementation("com.github.bumptech.glide:glide:4.16.0")
    implementation ("com.google.code.gson:gson:2.11.0")
}
