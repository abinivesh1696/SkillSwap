public class armstrong {
  public static void main(String [] args){
    int n= 400;

    for (int i = 1 ; i < n ;i++){
      boolean result = armstrongNumber(i);
      if(result) System.out.print(i + " ");  
    }
  }
  static boolean armstrongNumber(int original){
    int sum = 0;
    int n = original ;
    while(n > 0){
      int rem = n % 10;
      sum = sum + rem*rem*rem ;
      n /= 10;
    }
    return sum == original;
  }
}
