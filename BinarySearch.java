public class BinarySearch {
  public static void main(String[] args) {
        int [] arr ={-5, -4,-2 ,2 ,3 ,4 ,5 ,7 ,23 , 34 ,46 };

    System.out.println(binarySearch(arr , -5));
  }

  public static int binarySearch(int[] arr , int target){
    int start = 0 ;
    int end = arr.length - 1;

    while(start < end) {
        int mid = start + (end - start)/ 2 ;

        if(arr[mid] > target){
            end = mid - 1;
        }
        else if(arr[mid] < target){
            start = mid + 1;
        }
        else {
            return mid;
        }
    }
    return -1;
  }
}
