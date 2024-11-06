package com.example.chatapplication.Contact;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.chatapplication.Models.User;
import com.example.chatapplication.R;
import com.example.chatapplication.Services.RetrofitClient;
import com.example.chatapplication.Services.UserService;
import com.example.chatapplication.utils.ApiUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class ContactFriendFragment extends Fragment {
    private final String TAG = "ContactFriend";

    private RecyclerView friendRecycleView;
    private List<User> friendList;

    public ContactFriendFragment() {
    }



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        var view = inflater.inflate(R.layout.fragment_contact_friend, container, false);

        friendRecycleView = view.findViewById(R.id.friendList);

        friendList = new ArrayList<>();
        var friendAdapter = new FriendAdapter(friendList);
        friendRecycleView.setAdapter(friendAdapter);
        friendRecycleView.setLayoutManager(new LinearLayoutManager(view.getContext()));

        UserService userServide = RetrofitClient.getRetrofitInstance(getContext()).create(UserService.class);
        ApiUtil.callApi(userServide.getFriendList(), new ApiUtil.ApiCallback<>() {

            @Override
            public void onSuccess(List<User> result) {
                friendList.clear();
                friendList.addAll(result);
                friendAdapter.setFriendList(result);
            }

            @Override
            public void onError(Throwable t) {
                Log.e(TAG,"fail" + t.getMessage() );
            }
        });


        return view;
    }
}