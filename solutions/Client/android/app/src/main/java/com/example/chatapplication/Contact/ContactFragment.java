package com.example.chatapplication.Contact;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.adapter.FragmentStateAdapter;
import androidx.viewpager2.widget.ViewPager2;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.chatapplication.Models.User;
import com.example.chatapplication.R;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;

import java.util.List;


public class ContactFragment extends Fragment {
    private final String TAG = "Contact";
    private TabLayout tabLayout;
    private ViewPager2 viewPager;


    public ContactFragment() {
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);





    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        var view = inflater.inflate(R.layout.fragment_contact, container, false);
        tabLayout = view.findViewById(R.id.tab_layout);
        viewPager = view.findViewById(R.id.view_pager);
        viewPager.setSaveEnabled(false);
        // Set up the adapter for ViewPager
        viewPager.setAdapter(new FragmentStateAdapter(this) {
            @NonNull
            @Override
            public Fragment createFragment(int position) {
                return switch (position) {
                    case 1 -> new ContactGroupFragment();
                    default -> new ContactFriendFragment();
                };
            }

            @Override
            public int getItemCount() {
                return 2;
            }
        });

        new TabLayoutMediator(tabLayout, viewPager, (tab, position) -> {
            switch (position) {
                case 0:
                    tab.setText("Bạn bè");
                    break;
                case 1:
                    tab.setText("Nhóm");
                    break;
            }
        }).attach();





        return  view;
    }
}