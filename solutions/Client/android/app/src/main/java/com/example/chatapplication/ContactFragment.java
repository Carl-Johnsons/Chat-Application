package com.example.chatapplication;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.example.chatapplication.Contact.Fragment.FriendFragment;
import com.example.chatapplication.Contact.Fragment.GroupListFragment;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link ContactFragment} factory method to
 * create an instance of this fragment.
 */
public class ContactFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER

    // TODO: Rename and change types of parameters
    public ContactFragment() {
        // Required empty public constructor
    }

    // TODO: Rename and change types and number of parameters
    private Button btnFragmentFriends, btnFragmentGroups;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_contact, container, false);

        btnFragmentFriends = view.findViewById(R.id.btnFragmentFriends);
        btnFragmentGroups = view.findViewById(R.id.btnFragmentGroups);

        replaceFragment(new FriendFragment());

        btnFragmentFriends.setOnClickListener(v -> replaceFragment(new FriendFragment()));
        btnFragmentGroups.setOnClickListener(v -> replaceFragment(new GroupListFragment()));

        return view;
    }

    private void replaceFragment(Fragment fragment) {
        FragmentManager fragmentManager = getChildFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.fragment_container, fragment);
        fragmentTransaction.commit();
    }
}