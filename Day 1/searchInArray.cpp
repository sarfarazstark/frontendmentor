#include <bits/stdc++.h>
using namespace std;
// void addArray(){
//     string arr[10];
//     for(int i=0; i<sizeof(arr); i++){
//         cin >> arr[i];
//     }
// }
// void searchArray(int searchInput){
//     int n = sizeof(arr)/sizeof(arr[0]);
//     int x = searchInput;
//     int i = 0;
//     while(i<n){
//         if(arr[i] == x){
//             cout<<"Element found at index "<<i<<endl;
//             break;
//         }
//         i++;
//     }
//     if(i==n){
//         cout<<"Element not found"<<endl;
//     }
// }
int main(){
    string searchInput;
    string arr[10];
    for(int i=0; i < 10; i++){
        cin >> arr[i];
    }

    cout << "Search Now : ";
    cin  >> searchInput;

    int n = sizeof(arr)/sizeof(arr[0]);
    string x = searchInput;
    int i = 0;
    while(i < n){
        if(arr[i] == x){
            cout << x <<" found at index "<<i<<endl;
            break;
        }
        i++;
    }
    if(i==n){
        cout<<"Element not found"<<endl;
    }
    return 0;
}